const { validateMessage } = require("../Validation/validateMessage");
const Message = require("../Models/message.model");

const getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages)
      return res
        .status(400)
        .json({ success: false, message: "No message found." });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const sendMessage = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({
      name: name,
      email: email,
      message: message,
    });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    res.status(200).json({ success: true, message: "Message deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = { sendMessage, getSentMessages, deleteMessage };
