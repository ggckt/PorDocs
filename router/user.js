let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken')

let userController = require('../controller/user')


router.put('/edit/:id', verifytoken, checkUser, userController.editUser)
router.get('/:id', addUserDetail, userController.getUser)
router.post('', userController.googleSignin)


function addUserDetail(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        next()
    }
    else {
        jwt.verify(token, 'secret of pordocs', (err, decoded) => {
            if (err) {
                console.log(err)
                next()
            }
            else {
                req.user = decoded.user
                next()
            }
        })
    }
}

function verifytoken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json({ auth: false, message: "Not Logged In" })
    }
    else {
        jwt.verify(token, 'secret of pordocs', (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(401).json({ auth: false, message: "Not Logged In" })
            }
            else {
                req.user = decoded.user
                next()
            }
        })
    }
}
function checkUser(req, res, next) {
    if (req.user._id == req.params.id) {
        next()
    }
    else {
        res.status(401).json({ auth: false, message: "You are not authorized to edit this profile" })
    }
}

module.exports = router