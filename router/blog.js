let express = require('express');
let jwt = require('jsonwebtoken')
let router = express.Router();

let blogController = require('../controller/blog')

router.get('/adminpendingblogs', verifytoken, isAdmin, blogController.getAllPendingBlogsAdmin)
router.get('/page/:page', blogController.getAllblogs)
router.get('/:id', blogController.getbyid)
router.get('/:id/likecount', blogController.getLikeCount)
router.get('/:id/didlike', verifytoken, blogController.userDidLike)
router.get('/:id/comment', blogController.getComments)


router.post('/', verifytoken, blogController.postBlog)
router.post('/:id/like', verifytoken, blogController.addLike)
router.post('/:id/comment', verifytoken, blogController.addComment)


router.put('/adminpendingblogs/:id', verifytoken, isAdmin, blogController.approveBlogAdmin)
router.put('/:id', verifytoken, blogController.isAuthorized, blogController.editBlog)
router.put('/:id/comment/:cmntid', verifytoken, blogController.userDidComment, blogController.editComment)


router.delete('/adminpendingblogs/:id', verifytoken, isAdmin, blogController.deleteBlogbyAdmin)
router.delete('/:id', verifytoken, blogController.isAuthorized, blogController.deleteBlog)
router.delete('/:id/like', verifytoken, blogController.removeLike)
router.delete('/:id/comment/:cmntid', verifytoken, blogController.userDidComment, blogController.deleteComment)


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
module.exports = router