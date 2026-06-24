const express=require("express");

const router=express.Router();

const meet=

require("../controllers/meetingController");


router.post(

"/create",

meet.createMeeting

);


module.exports=router;