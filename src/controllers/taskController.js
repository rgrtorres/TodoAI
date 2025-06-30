const taskService = require('../services/taskService');
const { InferenceClient } = require('@huggingface/inference');
const client = new InferenceClient(process.env.HF_TOKEN);
const mongoose = require('mongoose');

async function gerarSubtasks(data) {
    const task = await taskService.getById(data.id);

    try {
        const resp = await client.chatCompletion({
            model: 'meta-llama/Llama-3.1-8B-Instruct',
            messages: [
                {
                    role: 'user',
                    content: `
    Gera apenas um array JSON com subtasks.
    Título: "${task.title}"
    Descrição: "${task.description}"
    Formato esperado: [
    { "title": "string", "status": "pending" "dueDate": "YYYY-MM-DD" }
    ]
    Comece a resposta com '[' e termine com ']'.
          `.trim(),
                },
            ],
            max_tokens: 150,
            temperature: 0.7,
            provider: 'auto', // usa o melhor roteamento disponível :contentReference[oaicite:1]{index=1}
        });

        const content = resp.choices[0].message.content;
        let suggestions;
        try {
            suggestions = JSON.parse(content);
            if (!Array.isArray(suggestions)) throw new Error('Resposta não é um array');
        } catch (e) {
            console.error('JSON inválido da IA:', content);
            return res.status(500).json({ error: 'JSON inválido da IA', raw: content });
        }

        task.subtasks.push(...suggestions);
        await task.save();
    } catch (err) {
        console.error('Erro no client HF:', err);
        res.status(500).json({ error: 'Erro ao gerar subtasks', details: err.message });
    }
}

const getAllTasks = async (req, res) => {
    const tasks = await taskService.getAll();
    res.json(tasks)
}

const createTask = async (req, res) => {
    const { title, description } = req.body
    const task = await taskService.create({ title, description })
    gerarSubtasks(task)

    res.status(200).json({ msg: "Task criada com sucesso" })
}

const getById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const task = await taskService.getById(id)

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(200).json(task)
    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const task = await taskService.deleteTask(id)

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(200).json({ msg: "Task deleted" })
    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    deleteTask
}