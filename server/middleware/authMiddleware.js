const jwt=require("jsonwebtoken");


module.exports=(req,res,next)=>{


const token=

req.header("token");


if(!token)

return res.send("No Token");


try{


jwt.verify(

token,

"secretkey"

);


next();


}


catch{


res.send(

"Invalid Token"

);


}


};