const { ObjectId } = require('bson');
let Blog = require('../models/blog')
let Comment = require('../models/comment')
let Like = require('../models/likeBlog')

exports.getAllblogs = (req, res, next) => {
    let skip = req.params.page;
    skip = (skip - 1) * 10;

    Blog.find({ isApproved: true }, {}, { sort: { '_id': -1 }, skip: skip, limit: 10 }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else
            res.send(data)
    })
}
exports.getAllPendingBlogsAdmin = (req, res, next) => {
    Blog.find({ isApproved: false }, {}, { sort: { '_id': -1 } }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else
            res.send(data)
    })
}
exports.getComments = (req, res, next) => {
    let blogId = req.params.id
    Comment.find({ blogId }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else
            res.send(data)
    })
}
exports.getLikeCount = (req, res) => {
    Like.find({ blogid: req.params.id }, (err, data) => {
        if (err)
            console.log(err)
        else {
            if (data[0])
                res.send({ count: data[0].userid.length });
            else
                res.send({ count: 0 })
        }
    })
}
exports.userDidLike = (req, res) => {
    Like.find({ blogid: req.params.id }, (err, data) => {
        if (err)
            console.log(err)
        else {
            if (data[0]) {
                const index = data[0].userid.findIndex(id => {
                    return id.toString() === req.user._id.toString();
                })
                if (index >= 0) {
                    res.send(true)
                }
                else {
                    res.send(false)
                }
            }
        }
    })
}

exports.getbyid = (req, res, next) => {

    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data)
            res.end();
        }
    })
}


exports.postBlog = (req, res, next) => {

    req.body.userid = req.user._id
    req.body.username = req.user.username
    Blog.create(req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.editBlog = (req, res, next) => {

    req.body.userid = req.user._id
    req.body.username = req.user.username
    Blog.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.addComment = (req, res, next) => {
    req.body.blogId = req.params.id
    req.body.userid = req.user._id
    req.body.username = req.user.username
    Comment.create(req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.editComment = (req, res, next) => {
    req.body.blogId = req.params.id
    req.body.userid = req.user._id
    req.body.username = req.user.username
    Comment.findByIdAndUpdate(req.params.cmntid, req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.approveBlogAdmin = (req, res) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            data.isApproved = true;
            data.save()
            res.send("Approved");
        }
    })
}

exports.addLike = (req, res) => {
    Like.find({ blogid: req.params.id }, (err, data) => {
        if (err)
            console.log(err)
        else {
            if (data[0]) {
                const index = data[0].userid.findIndex(id => {
                    return id.toString() === req.user._id.toString();
                })
                if (index >= 0) {

                }
                else {
                    data[0].userid.push(req.user._id)
                    data[0].save()
                }
                res.send({ count: data[0].userid.length })
            }
            else {
                Like.create({ blogid: req.params.id, userid: [req.user._id] }, (err, data) => {
                    if (err)
                        console.log(err)
                    else {
                        res.send({ count: 1 })
                    }
                })
            }
        }
    })
}

exports.deleteComment = (req, res, next) => {
    Comment.findByIdAndRemove(req.params.cmntid, (err, data) => {
        if (err)
            console.log(err)
        else
            res.status(200).json("success")
    })
}

exports.deleteBlog = (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            console.log(err)
        else {
            Comment.deleteMany({ blogId: req.params.id }, (err, data) => {
                if (err)
                    throw err
                else
                    res.status(200).json("success")
            })
        }
    })
}
exports.deleteBlogbyAdmin = (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            console.log(err)
        else {
            Comment.deleteMany({ blogId: req.params.id }, (err, data) => {
                if (err)
                    throw err
                else
                    res.status(200).json("success")
            })
        }
    })
}
exports.removeLike = (req, res) => {
    Like.find({ blogid: req.params.id }, (err, data) => {
        if (data[0]) {
            const rmlike = data[0].userid.filter((id) => {
                return id.toString() != req.user._id.toString();
            })
            data[0].userid = rmlike
            data[0].save()
            res.send({ count: data[0].userid.length })
        }
        else {
            res.end()
        }
    })
}
exports.isAuthorized = (req, res, next) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (req.user._id == data.userid) {
                next();
            }
            else {
                res.status(401).json({ auth: false, message: "Not the Author" })
            }
        }
    })
}
exports.userDidComment = (req, res, next) => {
    Comment.findById(req.params.cmntid, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (req.user._id == data.userid) {
                next();
            }
            else {
                res.status(401).json({ auth: false, message: "Not the Author" })
            }
        }
    })
}