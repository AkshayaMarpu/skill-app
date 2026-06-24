const Message=
require("../models/Message");


exports.sendMessage=

async(req,res)=>{


const msg=
new Message(req.body);


await msg.save();


res.json(msg);


};



exports.getMessages=

async(req,res)=>{


const data=

await Message.find();


res.json(data);


};