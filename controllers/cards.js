const Card = require('../models/card');
const NOT_FOUND = require('../utils/errors/NOT_FOUND');
const FORBIDDEN = require('../utils/errors/FORBIDDEN');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!card) {
      throw new NOT_FOUND('Card not found');
    }
    if (card.owner._id.toString() !== req.user._id) {
      throw new FORBIDDEN('cant delete another\'s card');
    }
    await card.deleteOne();
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
    ).populate(['owner', 'likes']);
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
    ).populate(['owner', 'likes']);
    if (!card) {
      throw new NOT_FOUND('Card not found');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};
