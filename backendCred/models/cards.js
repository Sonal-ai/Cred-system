const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        default: '-',
    },
    credits : {
        type: Number,
        required: true,
        default: 0,
    }
})

const Card = mongoose.model('Card',cardSchema);

module.exports = Card;