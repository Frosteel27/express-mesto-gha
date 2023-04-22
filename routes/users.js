const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
  getMe,
} = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex),
  }),
}), updateAvatar);

module.exports = router;
