const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const { validateCardId, validateCard } = require('../utils/validators/cardValidators');

router.get('/', getCards);

router.post('/', validateCard, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, putLike);

router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
