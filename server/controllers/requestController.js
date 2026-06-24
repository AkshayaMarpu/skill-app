const Request=

require("../models/Request");


exports.sendRequest=

async(req,res)=>{


const req1=

new Request(req.body);


await req1.save();


res.json(req1);


};