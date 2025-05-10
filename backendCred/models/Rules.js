const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    credits: {
        type: Number,
        required : true,
    },
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        default: '-',
    },
})

const Rules = mongoose.model('Rules',ruleSchema);

module.exports = Rules ;