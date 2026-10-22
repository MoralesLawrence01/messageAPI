const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        required: true
    }
})

const message = mongoose.model("message", messageSchema)

module.exports = message