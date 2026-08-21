const express= require('express');
const bcrypt = require('bcryptjs');

const Hospitals = require('../models/Hospitals');
const Users = require('../models/Users');


const router = express.Router();


router.get("/" ,(request , response) =>{
    try {
        response.status(200).json({message: "WWELCOME TO hospital"});
        
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});


router.post("/register", async (request, response)=>{
    try {
        const {name ,username , email, password} = request.body;

         if(!name){
            return response.status(400).json({message: "name field required"});
        }else if(!username){
            return response.status(400).json({message: "usernmae field required"});
        }
        else if(!email){
            return response.status(400).json({message: "email field required"});
        }
        else if(!password){
            return response.status(400).json({message: "password field required"});
        }
        const hashpassword = await bcrypt.hash(password , 10);

        const User = {
            name:name,
            username:request.body.username,
            email: request.body.email,
            password:hashpassword,
        }

        const users = new Users(User);

        await users.save();

        response.status(201).json({message:"user created successfully", users});

    } catch (error) {

        response.status(500).json({message: error.message});
        
    }
} );


router.post("/login", async (request , response)=>{
    try {
        const {username,password } = request.body;

        if(!username){
            return response.status(400).json({message:"username is required"});
        } 
        if(!password){
            return response.status(400).json({message:"password is required"});
        }

        const user = await Users.findOne({username:username});
        if(!user){
            return response.status(400).json({message: "user does not exist"});
        }
        
        const isPasswordVaild = await bcrypt.compare(password ,user.password);
        if(!isPasswordVaild){
            return response.status(400).json({message: "passsword is incorrect"});
        }

        response.status(200).json({message:"login successfull"})
        
    } catch (error) {
        
        response.status(500).json({message: error.message});
    }
});

module.exports= router;

