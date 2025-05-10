const express = require('express');
const { handleCreateCard, handleFetchAllCards, handleDeleteCard } = require('../controllers/cards');

const router = express.Router();

router.post('/',handleCreateCard);
router.get('/',handleFetchAllCards);
router.delete('/:id',handleDeleteCard);

module.exports = router;