const chat = require("../models/chatSchema")
const { randomBytes } = require("node:crypto");
const bcrypt = require("bcryptjs");

const createChat = async (req, res) => {
    try{
        const key = randomBytes(32).toString("hex")
        const newChat = new chat({
            userId: req.session.userId,
            key: await bcrypt.hash(key, 10)
        })
        await newChat.save()
        res.json({
            message: "Chat created! Copy and save your chat key now. it will not be shown again. If lost, you’ll need to generate a new key",
            chatKey: key,
            ok: true
        })

    }
    catch{
        res.json({
            message: "Something went wrong, try again.",
            ok: false
        })
    }
    
}

const updateKey = async (req,res) => {
    try{
        const currChat = await chat.findOne({_id: req.params.id})
        const currUser = req.session.userId

        if (currChat.userId != currUser){
            return res.json({
                messsage: "You don't own this chat!",
                ok: false
            })
        }

        const key = randomBytes(32).toString("hex")
        
        currChat.key = await bcrypt.hash(key, 10)
        await currChat.save()
        res.json({
            message: "Key updated! Copy and save your chat key now. it will not be shown again. If lost, you’ll need to generate a new key",
            key: key,
            ok: true
        })
    }
    catch{
        res.json({
            message: "Something went wrong, try again.",
            ok: false
        })
    }
}

const getChats = async (req,res) => {
    try{
        const currUserAllChats = await chat.find({userId: req.session.userId})

        if(currUserAllChats.length >= 1){
            return res.json({
                chats: currUserAllChats,
                ok:true
            })
        }
        return res.json({
            message: "No chats",
            ok: true
        })

    }
    catch{
        res.status(500).json({
            message: "Something went wrong, try again.",
            ok: false
        })
    }
}

module.exports = { createChat, updateKey, getChats }