let mongoose = require('mongoose')

likeBlogSchema = new mongoose.Schema({
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },
    userid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})

module.exports = mongoose.model("likeBlog", likeBlogSchema)