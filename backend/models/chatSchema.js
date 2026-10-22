const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    key:{
        type: String,
        required: true
    }
})

const chat = mongoose.model("chat", chatSchema)

module.exports = chat