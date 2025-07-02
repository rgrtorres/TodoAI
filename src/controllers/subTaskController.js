const subTaskService = require('../services/subTaskService');

const createSubTask = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body
        
        const updatedTask = await subTaskService.create(id, body);

        res.status(200).json(updatedTask);
    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({ "msg": "Algo deu errado" })
    }
}

module.exports = {
    createSubTask
}