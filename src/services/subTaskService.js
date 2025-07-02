const Task = require('../models/task');

const create = (id, data) => Task.findByIdAndUpdate(id, { $push: { subtasks: data } }, { new: true })

module.exports = {
    create,
}