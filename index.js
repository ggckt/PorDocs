let express = require('express')
let userRouter = require('./router/user')
let questionRouter = require('./router/question')
let blogRouter = require('./router/blog')
let mongoose = require('mongoose')
let cors = require('cors')
const path = require("path")
let app = express();

require('dotenv').config()
app.use(cors())
mongoose.set('useFindAndModify', false);

app.use(express.json())



const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let connection = mongoose.connection;
connection.once("open", function () {
    console.log("connected with mongodb");
});






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