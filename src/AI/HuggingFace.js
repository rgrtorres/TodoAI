const taskService = require('../services/taskService');
const { InferenceClient } = require('@huggingface/inference');

const client = new InferenceClient(process.env.HF_TOKEN);

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
            provider: 'auto',
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

module.exports = {
    gerarSubtasks
}