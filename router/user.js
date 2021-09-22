let express = require('express');
let router = express.Router();

let userController = require('../controller/user')



router.post('', userController.googleSignin)


module.exports = router