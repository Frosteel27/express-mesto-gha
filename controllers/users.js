const User = require('../models/user');
const handleError = require('../utils/errors');

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

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about, avatar },
      { new: true, runValidators: true },
    );
    res.send(updatedUser);
  } catch (err) {
    console.log(err.name);
    handleError(res, err);
  }
};
