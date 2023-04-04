const { CastError } = require('mongoose');
const Card = require('../models/card');
const handleError = require('../utils/errors');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send(cards);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.cardId);
    res.send('done');
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.putLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new CastError();
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};

module.exports.deleteLike = async (res, req) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new CastError();
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    handleError(res, err);
  }
};
