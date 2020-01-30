const express = require('express');
const router = express.Router();
const { getTodos, getTodosByUser, getTodoById, createTodo, updateTodo, deleteTodo, isPoster } = require('../controllers/todos');
const { requireSignin } = require('../controllers/auth');

router.get('/', getTodos);
router.get('/postedBy/:userId', getTodosByUser);
router.get('/:id', getTodoById);
router.post('/add', requireSignin, createTodo);
router.post('/:id', requireSignin, updateTodo);
router.delete('/:id', requireSignin, deleteTodo);

module.exports = router;