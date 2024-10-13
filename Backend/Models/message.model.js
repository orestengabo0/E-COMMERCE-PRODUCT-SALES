const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Message = mongoose.model("Message",messageSchema)
module.exports = Message
