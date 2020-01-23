const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/users')

router.get('/', getUsers);
router.get('/user/:id', getUserById);
router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;