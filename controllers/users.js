const User = require('../models/user');
const { handleError, errors } = require('../utils/errors');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    console.log(err.name);
    handleError(res, err);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(errors.NOT_FOUND).send({ message: 'Entity not found' });
      return;
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(updatedUser);
  } catch (err) {
    console.log(err.name);
    handleError(res, err);
  }
};

module.exports.updateAvatar = async (req, res) => {
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
    handleError(res, err);
  }
};
