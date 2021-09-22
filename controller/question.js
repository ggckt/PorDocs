let Question = require('../models/qusetion')
let Answer = require('../models/answer')

exports.getAllquestion = (req, res, next) => {

    let skip = req.params.page;
    skip = (skip - 1) * 10;

    Question.find({ isApproved: true }, {}, { sort: { '_id': -1 }, skip: skip, limit: 10 }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else
            res.send(data)
    })

}
exports.getAllPendingQuestionsAdmin = (req, res, next) => {
    Question.find({ isApproved: false }, {}, { sort: { '_id': -1 } }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else
            res.send(data)
    })
}
exports.approveQuestionAdmin = (req, res) => {
    Question.findById(req.params.id, (err, data) => {
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
exports.deleteQuestionbyAdmin = (req, res, next) => {
    Question.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            console.log(err)
        else {
            Answer.deleteMany({ blogId: req.params.id }, (err, data) => {
                if (err)
                    throw err
                else
                    res.status(200).json("success")
            })
        }
    })
}
exports.getAnswers = (req, res, next) => {
    let questionsId = req.params.id
    Answer.find({ questionsId }, (err, data) => {
        if (err)
            console.log(err)
        else
            res.send(data)
    })
}

exports.getQuestinbyid = (req, res, next) => {

    Question.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data)
        }
    })
}


exports.postQuestion = (req, res, next) => {

    req.body.userid = req.user._id
    req.body.username = req.user.username
    Question.create(req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.editQuestion = (req, res, next) => {

    req.body.userid = req.user._id
    req.body.username = req.user.username
    Question.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.addAnswer = (req, res, next) => {
    req.body.questionsId = req.params.id
    req.body.username = req.user.username
    req.body.userid = req.user._id
    Answer.create(req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.editAnswer = (req, res, next) => {
    req.body.questionsId = req.params.id
    req.body.username = req.user.username
    req.body.userid = req.user._id
    Answer.findByIdAndUpdate(req.params.ansid, req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.deleteAnswer = (req, res, next) => {
    Answer.findByIdAndRemove(req.params.ansid, (err, data) => {
        if (err)
            console.log(err)
        else
            res.status(200).json("success")
    })
}

exports.deleteQuestion = (req, res, next) => {
    Question.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            console.log(err)
        else {
            Answer.deleteMany({ questionsId: req.params.id }, (err, data) => {
                if (err)
                    console.log(err)
                else
                    res.status(200).json("success")
            })
        }
    })
}
exports.isAuthorized = (req, res, next) => {
    Question.findById(req.params.id, (err, data) => {
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
exports.userDidAnswer = (req, res, next) => {
    Answer.findById(req.params.ansid, (err, data) => {
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