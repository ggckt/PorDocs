let mongoose = require('mongoose')

userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    qnids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question"
    }],
    ansids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer"
    }],
    blogids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }],
    commentids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('User', userSchema)