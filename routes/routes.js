const express = require('express');
const router = express.Router();
const User = require('../models/register');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const schema =joi.object({
    name: joi.string().min(6).required(),
    password: joi.string().min(6).required(),
    email: joi.string().min(6).required(),
    profilepicture:joi.string(),
})
router.post('/',async(req,res)=>{
    const {error} = schema.validate(req.body);
    
    if(error) return res.status(400).send({message:error.details[0].message,registred:false,});

    const emailexist = await User.findOne({email:req.body.email});
    if(emailexist) {res.status(400).send({message:"email already exists", registred:false,});}
    const nameexist = await User.findOne({name:req.body.name});
    if(nameexist) {res.status(400).send({message:"name already exists", registred:false,});} 
    else{
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(req.body.password,salt);
            const register = await  User({
            name:req.body.name,
            password:hashedpassword,
            email:req.body.email,
            profilepicture:req.body.profilepicture,
        })
    
        
    const registerd_user = await register.save();
    res.status(200).send({
        message:'Registerd sucessfully',
        registred:true,
    })
}
    
});






module.exports = router;