const { ObjectID } = require('mongodb');
let mongoose = require('mongoose')

questionSchema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    answerids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
    }]
})

module.exports = mongoose.model('Question', questionSchema)