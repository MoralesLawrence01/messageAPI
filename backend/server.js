const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const dotenv = require("dotenv")
dotenv.config()

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set in the environment")
}

//schema
const user = require("./models/userSchema")
const message = require("./models/messageSchema")
const chat = require("./models/chatSchema")
//routes
const authRoute = require("./routes/auth")
const authMiddleware = require("./middleware/auth")

const app = express()

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use("/api/auth/", authRoute)

app.get("/test", authMiddleware.authMiddleware, (req,res) => {
    res.json({
        message: "login success",
        userId: req.session.userId
    })
})


mongoose.connect("mongodb://localhost:27017/")
    .then(()=>{console.log("connected")})
    .catch(()=>{console.log("not connected")})

app.listen(3000, (req,res) => {
    console.log("connected server")
})