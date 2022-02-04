import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import UserSchema from "../models/User.js";
import nodemailer from "nodemailer";
const User_Signup_Details = mongoose.model("User_Signup_details",UserSchema);

router.get("/",(req,res)=>{
    res.send("hello");
})
router.post("/signup",(req,res)=>{
    const { username,email,password} = req.body
    User_Signup_Details.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message: "User Already Exist"});
        }
        else{
            const user = new User_Signup_Details({
                username,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send({message: err})
                }else{
                    const output =
                    `<h2>Welcome mail for testing!! </h2>`;
                    const transporter = nodemailer.createTransport({
                        host:'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user :process.env.PORTAL_MAIL_ID,
                            pass :process.env.PORTAL_MAIL_PASSWORD
                        },
                        tls:{
                            rejectUnauthorized: false
                        }
                    });
                    const mailOptions = {
                        from :'"Prerna"',
                        to : email,
                        subject: 'Welcome Mail',
                        text: '',
                        html: output
                    };
                    transporter.sendMail(mailOptions,(err,info)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(info.messageId);
                            res.send({message: "Successfull SignUp"})
                        }
                    });
                }
            })
        }
    })
})
export default router;