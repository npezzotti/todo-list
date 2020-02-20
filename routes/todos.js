const express = require('express');
const router = express.Router();
const { getTodos, singleTodo, getTodosByUser, getTodoById, createTodo, updateTodo, deleteTodo, isAuthor } = require('../controllers/todos');
const { requireSignin } = require('../controllers/auth');

router.get('/', getTodos);
router.get('/postedBy/:userId', getTodosByUser);
router.get('/:id', singleTodo);
router.post('/add', requireSignin, createTodo);
router.post('/:id', requireSignin, isAuthor, updateTodo);
router.delete('/:id', requireSignin, isAuthor, deleteTodo);

router.param("id", getTodoById)

module.exports = router;