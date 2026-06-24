const mongoose=require("mongoose");

const meetingSchema=
new mongoose.Schema({

userId:{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

},

link:String

});

module.exports=
mongoose.model(

"MeetingLink",

meetingSchema

);