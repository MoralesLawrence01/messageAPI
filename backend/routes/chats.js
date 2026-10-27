const express = require("express")
const routes = express.Router()
const chatsController = require("../controllers/chats")

routes.post("/chat", chatsController.createChat)
routes.put("/chat/:id", chatsController.updateKey)
routes.get("/chat", chatsController.getChats)

module.exports = routes