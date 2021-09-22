let express = require('express');
let jwt = require('jsonwebtoken')
let router = express.Router();

let questionController = require('../controller/question')

router.get('/adminpendingquestions', verifytoken, isAdmin, questionController.getAllPendingQuestionsAdmin)
router.get('/page/:page', questionController.getAllquestion)
router.get('/:id', questionController.getQuestinbyid)
router.get('/:id/answer', questionController.getAnswers)

router.post('/', verifytoken, questionController.postQuestion)
router.post('/:id/answer', verifytoken, questionController.addAnswer)

router.put('/adminpendingquestions/:id', verifytoken, isAdmin, questionController.approveQuestionAdmin)
router.put('/:id', verifytoken, questionController.isAuthorized, questionController.editQuestion)
router.put('/:id/answer/:ansid', verifytoken, questionController.userDidAnswer, questionController.editAnswer)

router.delete('/adminpendingquestions/:id', verifytoken, isAdmin, questionController.deleteQuestionbyAdmin)
router.delete('/:id', verifytoken, questionController.isAuthorized, questionController.deleteQuestion)
router.delete('/:id/answer/:ansid', verifytoken, questionController.userDidAnswer, questionController.deleteAnswer)



function verifytoken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json({ auth: false })
    }
    else {
        jwt.verify(token, 'secret of pordocs', (err, decoded) => {
            if (err) {
                res.status(401).json({ auth: false })
            }
            else {
                req.user = decoded.user
                next()
            }
        })
    }
}

function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next()
    }
    else {
        res.status(401).json({ auth: false, message: "You are not Admin" })
    }
}

module.exports = router