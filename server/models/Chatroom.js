const mongoose=require("mongoose");

const chatroomSchema=
new mongoose.Schema({

users:[{

type:mongoose.Schema.Types.ObjectId,
ref:"User"

}]

});

module.exports=
mongoose.model("Chatroom",
chatroomSchema);