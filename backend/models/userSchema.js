const mongoose = require("mongoose")

const usersChema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

const user = mongoose.model("user", usersChema)

module.exports = user