let mongoose = require('mongoose')

blogSchema = new mongoose.Schema({

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
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    commentids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
})

module.exports = mongoose.model("Blog", blogSchema)