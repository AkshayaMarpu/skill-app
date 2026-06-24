const Message = require("../models/Message");

exports.saveMessage = async (sender, receiver, text) => {

    const message = await Message.create({
        sender,
        receiver,
        text
    });

    return message;

};


exports.fetchMessages = async (sender, receiver) => {

    const messages = await Message.find({

        $or: [

            {
                sender,
                receiver
            },

            {
                sender: receiver,
                receiver: sender
            }

        ]

    }).sort({ createdAt: 1 });

    return messages;

};