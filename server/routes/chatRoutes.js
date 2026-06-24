const express=require("express");

const router=express.Router();

const chat=

require("../controllers/chatController");


router.post(

"/send",

chat.sendMessage

);


router.get(

"/all",

chat.getMessages

);


module.exports=router;