const MeetingLink=

require("../models/MeetingLink");


exports.createMeeting=

async(req,res)=>{


const meet=

new MeetingLink({


userId:req.body.userId,


link:

"https://meet.google.com/"


+Date.now()


});


await meet.save();


res.json(meet);


};