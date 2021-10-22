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
    phoneno: {
        type: Number,
        required: false,
    },
    linkedin: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    other: {
        type: String,
        required: false
    },
    showDetails: {
        type: Boolean,
        default: false
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