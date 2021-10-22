let User = require('../models/user')
let jwt = require('jsonwebtoken')
let { OAuth2Client } = require('google-auth-library')
const user = require('../models/user')

const client = new OAuth2Client("1074737771366-mat44f2fndsqpdb8erut14rkmg9e6ui4.apps.googleusercontent.com")

exports.getAllUser = (req, res) => {

    User.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data);
            res.end();
        }
    })
}

exports.getUser = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err)
            console.log(err);
        else {
            if ((req.user && req.user._id == data._id) || data.showDetails == true) {
                res.send(data);
                res.end()
            }
            else {
                data.facebook = "";
                data.linkedin = "";
                data.phoneno = "";
                data.email = "";
                data.instagram = "";
                data.twitter = "";
                data.youtube = "";
                data.other = "";

                res.send(data);
                res.end()
            }
        }

    })
}

exports.editUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json("success")
        }
    })
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne(req.params.id, (err, data) => {
        if (err)
            console.log(err);
        else
            res.status(200).json("success")

    })
}

exports.googleSignin = (req, res, next) => {
    let { tokenId } = req.body

    client.verifyIdToken({ idToken: tokenId, audience: "1074737771366-mat44f2fndsqpdb8erut14rkmg9e6ui4.apps.googleusercontent.com" })
        .then((response) => {
            const { email_verified, name, email } = response.payload
            if (email_verified) {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(401).json("Unauthenticated")
                    }
                    else {
                        if (user) {
                            const token = jwt.sign({ user }, 'secret of pordocs', { expiresIn: '1d' })
                            req.user = user
                            res.json({ token, user })
                        }
                        else {
                            let newUser = new User({ username: name, email: email });
                            newUser.save((err, user) => {
                                if (err) {
                                    console.log(err)
                                    res.status(400).json("Unauthenticated")
                                }
                                else {
                                    req.user = user
                                    const token = jwt.sign({ user }, 'secret of pordocs', { expiresIn: '1d' })
                                    res.json({ token, user })
                                }
                            })
                        }
                    }
                })
            }
            else
                res.status(401).json("Unauthenticated")
        })
        .catch((err) => console.log(err))
}
