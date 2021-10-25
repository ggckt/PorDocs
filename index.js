let express = require('express')
let userRouter = require('./router/user')
let questionRouter = require('./router/question')
let blogRouter = require('./router/blog')
let mongoose = require('mongoose')
let cors = require('cors')
const path = require("path")
const nodemailer = require('nodemailer');
let app = express();
require('dotenv').config()

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else {
            const host = req.header('host')
            if (host.match(/^www\..*/i) || host.indexOf("heroku") !== -1)
                next()
            else
                res.redirect(`https://www.${req.header('host')}${req.url}`)
        }
    })
}
app.use(cors())
mongoose.set('useFindAndModify', false);

app.use(express.json())



const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let connection = mongoose.connection;
connection.once("open", function () {
    console.log("connected with mongodb");
});



app.post('/contactus', (req, res) => {
    const mailTransport = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        secure: true,
        secureConnection: true,
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
            user: "helpdesk@pordocs.com",
            pass: process.env.PRIMARY_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: `helpdesk@pordocs.com`,
        to: `helpdesk@pordocs.com`,
        replyTo: req.body.email,
        subject: `From Pordocs Contact Us`,
        text: req.body.name + ` with mail Id ` + req.body.email + ` has sent the below meassage\n` + req.body.message
    };

    mailTransport.sendMail(mailOptions).then(() => {
        res.status(200).json("success")
    }).catch((err) => {
        console.error(err);
    });
})


app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/question', questionRouter)



app.use(express.static(path.join(__dirname, "reactjs", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "reactjs", "build", "index.html"));
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running")
})