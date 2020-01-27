const express = require('express');
const router = express.Router();
const { getTodos, getTodosByUser, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todos');

router.get('/', getTodos);
router.get('/postedBy/:userId', getTodosByUser);
router.get('/:id', getTodoById);
router.post('/add', createTodo);
router.post('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;