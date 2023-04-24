const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const routes = require('./routes/index');
const NOT_FOUND = require('./utils/errors/NOT_FOUND');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateRegister } = require('./utils/validators/userValidators');
const { PORT } = require('./config');

const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);

app.use('/', routes);
app.use('*', (req, res, next) => {
  next(new NOT_FOUND('Page not found'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
