const express = require('express');
const router = express.Router();
const { getUsers, userById, getUser, updateUser, deleteUser, hasAuthorization } = require('../controllers/users')
const { userSignupValidator } = require('../validators');
const { requireSignin } = require('../controllers/auth')


router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/:userId', requireSignin, hasAuthorization, userSignupValidator, updateUser);
router.delete('/:userId', requireSignin, hasAuthorization, deleteUser);

router.param("userId", userById);

module.exports = router;