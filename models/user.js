const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UNAUTHORIZED = require('../utils/errors/UNAUTHORIZED');

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив-Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: () => 'Incorrect email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select(+password);
    if (!user) {
      return Promise.reject(new UNAUTHORIZED('Wrong email or password'));
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Promise.reject(new UNAUTHORIZED('Wrong email or password'));
    }
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = model('user', userSchema);
