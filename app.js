import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/SignUp.js";
import dotenv from "dotenv";
import path from 'path';
dotenv.config();
const app = express();



mongoose.connect(process.env.MONGOURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },()=>{
        console.log('connected to mongo db');
    });
    
    app.use(express.json());
    app.use(express.urlencoded())
    app.use(cors())
    
    app.use(router);

    if(process.env.NODE_ENV === 'production'){
        app.use(express.static('client/build'));
        app.get("*",(req,res)=>{
            res.sendFile(path.join(__dirname,'client','build','index.html'));
        })
    }
    
app.listen(process.env.PORT || 5050,()=>{
    console.log("Server running");
})