const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const NOT_FOUND = require('./utils/errors/NOT_FOUND');
const { urlRegex } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', () => {
  throw new NOT_FOUND('Page not found');
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
