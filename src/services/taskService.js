const Task = require('../models/task');

const getAll = () => Task.find();
const create = (data) => Task.create(data)
const getById = (data) => Task.findById(data)
const deleteTask = (data) => Task.findByIdAndDelete({ _id: data })

module.exports = {
    getAll,
    create,
    getById,
    deleteTask
}