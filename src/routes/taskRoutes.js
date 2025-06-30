const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getById)
router.delete('/:id', taskController.deleteTask)
router.post('/', taskController.createTask)
router.patch('/done/:id', taskController.updateTask)
//router.post('/done/:id/:idSubTask', taskController.doneSubTask)
//router.post('/:id/suggest-subtasks', taskController.suggestSubTask)

module.exports = router