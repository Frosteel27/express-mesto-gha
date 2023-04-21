const Card = require('../models/card');
const NOT_FOUND = require('../utils/errors/NOT_FOUND');
const FORBIDDEN = require('../utils/errors/FORBIDDEN');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      throw new NOT_FOUND('Card not found');
    }
    if (card.owner._id.toString() !== req.params._id) {
      throw new FORBIDDEN('cant delete another\'s card');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.putLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NOT_FOUND('Card not found');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NOT_FOUND('Card not found');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};
