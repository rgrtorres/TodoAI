const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const subTaskController = require('../controllers/subTaskController');

router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getById)
router.delete('/:id', taskController.deleteTask)
router.post('/', taskController.createTask)
router.patch('/:id', taskController.updateTask)
router.post('/:id/subtask', subTaskController.createSubTask)
//router.post('/done/:id/:idSubTask', taskController.doneSubTask)
//router.post('/:id/suggest-subtasks', taskController.suggestSubTask)

module.exports = router