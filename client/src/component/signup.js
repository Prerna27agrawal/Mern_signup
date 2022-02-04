import React, { useState } from 'react';
import axios from "axios";
import "./signup.css";
import {useHistory} from 'react-router-dom';

const SignUp = ()=>{
    const history=useHistory();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
        confirm_password:""
    })

    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const PostData = ()=>{
        const {username,email,password,confirm_password} = user;
        if(email && username && password && confirm_password){
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)){
                alert("fill valid email");  
            }else{
            if(password !== confirm_password)
            {
                alert("Passwords does not match");
            }
            else{
                // console.log("all data");
                axios.post("/signup", user).then(res=>{
                if(res.data.message == "User Already Exist"){
                    alert(res.data.message);   
                    history.push("/");
                }else if(res.data.message =="Successfull SignUp"){
                    alert(res.data.message);   
                    history.push("/welcome");}         
                }).catch(err =>{
                        alert("Something went wrong");
                        history.push('/')
                })
                }
            }
        }else{
            alert("Enter all details");
        }
    }
    return (
            <div className="general">
            <h1>SignUp</h1>
            <input type="text"  name="username" value={user.username} placeholder="Enter Username" onChange={handleChange}/>
            <input type="email"  name="email" value={user.email} placeholder="Enter Your Email" onChange={handleChange}/>
            <input type="password"  name="password" value={user.password} placeholder="Enter Password" onChange={handleChange}/>
            <input type="password"  name="confirm_password" value={user.confirm_password} placeholder="Confirm Your Password" onChange={handleChange}/>
            <div className="button" onClick={PostData}>SignUp</div>
        </div>
    )
}
export default SignUp;