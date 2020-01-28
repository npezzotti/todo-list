const express = require('express');
const router = express.Router();
const { getUsers, userById, getUser, updateUser, deleteUser } = require('../controllers/users')
const { userSignupValidator } = require('../validators');


router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/:userId', userSignupValidator, updateUser);
router.delete('/:userId', deleteUser);

router.param("userId", userById);

module.exports = router;