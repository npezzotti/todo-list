const express = require('express');
const router = express.Router();
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todos');

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/add', createTodo);
router.post('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);

module.exports = router;