exports.registerValidation = (req,res,next)=>{


    const {name,email,password}=req.body;


    if(!name || !email || !password){

        return res.status(400).json({

            message:"All fields are required"

        });

    }


    if(password.length<6){

        return res.status(400).json({

            message:"Password must contain 6 characters"

        });

    }


    next();

};



exports.loginValidation=(req,res,next)=>{


const {email,password}=req.body;


if(!email || !password){

return res.status(400).json({

message:"Email and Password required"

});

}


next();

};