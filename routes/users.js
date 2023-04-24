const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
  getMe,
} = require('../controllers/users');
const { validateUserId, validateUserInfo, validateAvatar } = require('../utils/validators/userValidators');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:id', validateUserId, getUserById);

router.post('/', createUser);

router.patch('/me', validateUserInfo, updateUserInfo);

router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
