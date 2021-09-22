const { ObjectID } = require('mongodb');
let mongoose = require('mongoose')

commentSchema = new mongoose.Schema({

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
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    },
    comnt: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Comment', commentSchema)