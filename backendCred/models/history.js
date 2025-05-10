const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    credits: {
        type: Number,
        required : true,
    },
    title : {
        type: String,
        required: true,
    },
    date: {
        type : Date,
        default: Date.now
    }
})

const History = mongoose.model('History',historySchema);

module.exports = History ;