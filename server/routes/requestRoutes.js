const express=require("express");

const router=express.Router();

const req1=

require("../controllers/requestController");


router.post(

"/send",

req1.sendRequest

);


module.exports=router;