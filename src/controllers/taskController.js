const taskService = require('../services/taskService');
const mongoose = require('mongoose');

//AI's
const huggingface = require('../AI/HuggingFace')
const Gemini = require('../AI/Gemini')

const getAllTasks = async (req, res) => {
    const tasks = await taskService.getAll();
    res.json(tasks)
}

const createTask = async (req, res) => {
    const { title, description } = req.body
    const task = await taskService.create({ title, description })
    Gemini.gerarSubtasks(task)

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

const updateTask = async (req, res) => {
    const { id } = req.params;
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const update = await taskService.updateTask(id, body, { new: true })
        if (!update) {
            return res.status(404).json({ error: "Task not found" })
        }

        return res.status(200).json(update)
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    deleteTask,
    updateTask
}