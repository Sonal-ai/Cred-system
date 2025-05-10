const express = require('express');
const {handleCreateHistory, handleDeleteHistory, handleFetchFullHistory} = require('../controllers/history');

const router = express.Router();

router.post('/',handleCreateHistory);
router.get('/',handleFetchFullHistory);
router.delete('/del',handleDeleteHistory);

module.exports = router;