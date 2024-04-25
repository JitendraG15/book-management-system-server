const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Handler for handling registration process of new users
exports.registration = async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the mandatory details."
            })
        }

        const isUserExist = new User.findOne({email:email});
        if(isUserExist){
            return res.status(401).json({
                success:false,
                message:"User already registered with us. please proceed to login."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword
        });

        return res.status(200).json({
            success:true,
            message:"User registered successfully!",
            user
        })


    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something unexpected happended at server side while registration operation."
        })
    }
}

// Handler for handling secure login of registered users
exports.login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter all the necessary details to proceed."
            })
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not registered with us. Please register yourself first."
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
              { email: user.email, id: user._id, role: user.role },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            )
      
            // Save token to user document in database
            user.token = token
            user.password = undefined
            // Set cookie for token and return success response
            const options = {
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
              success: true,
              token,
              user,
              message: `User logged in successfully.`,
            })
          } else {
            return res.status(401).json({
              success: false,
              message: `Please enter your correct password.`,
            })
          }

    
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"An unexpected error occured at server side while login operation."
        })
    }
}