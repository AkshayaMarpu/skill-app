const express=require("express");

const router=express.Router();

const user=

require("../controllers/userController");


router.get(

"/all",

user.getUsers

);


module.exports=router;