let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken')
let multer = require('multer')
let userController = require('../controller/user')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./reactjs/public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })

router.get('/alluser', verifytoken, isAdmin, userController.getAllUser)
router.get('/:id', addUserDetail, userController.getUser)
router.put('/edit/:id', verifytoken, checkUser, upload.single("pic"), userController.editUser)
router.post('', userController.googleSignin)
router.delete('/:id', verifytoken, isAdmin, userController.deleteUser)
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
function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next()
    }
    else {
        res.status(401).json({ auth: false, message: "You are not Admin" })
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