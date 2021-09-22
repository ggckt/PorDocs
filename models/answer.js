const { ObjectID } = require('mongodb');
let mongoose = require('mongoose')

answerSchema = new mongoose.Schema({

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
    questionsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
    },
    answer: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Answer', answerSchema)