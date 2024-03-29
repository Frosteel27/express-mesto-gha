const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { cachingDecorator } = require('../utils/decorators');
const NOT_FOUND = require('../utils/errors/NOT_FOUND');
const CONFLICT = require('../utils/errors/CONFLICT');

const findById = cachingDecorator(User.findById.bind(User));

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await findById(req.params.id);
    if (!user) {
      throw new NOT_FOUND('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const data = user.toObject();
    delete data.password;
    res.status(201).send({
      data,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new CONFLICT('Account with this email already exists'));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};
