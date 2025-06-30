const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getById)
router.delete('/:id', taskController.deleteTask)
router.post('/', taskController.createTask)
//router.post('/:id/suggest-subtasks', taskController.suggestSubTask)

module.exports = router