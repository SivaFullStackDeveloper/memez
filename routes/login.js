
const express = require('express');
const router = express.Router();
const User = require('../models/register');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();


const schema2 =joi.object({
  
    name: joi.string().required(),
    password: joi.string().min(6).required(),
 
});

router.post('/',async(req,res)=>{
    const {error} = schema2.validate(req.body);
    if(error) return  res.status(400).send(error.details[0].message);

    const emailexist = await User.findOne({name:req.body.name});

    if(!emailexist) return  res.status(400).send({message:"username does not exists", login:false,});

const validpassword = await   bcrypt.compare(req.body.password,emailexist.password);
if(!validpassword) return res.status(400).send({message:"password is not valid", login:false,});
   const token = jwt.sign({_id:emailexist.id},process.env.TOKEN);
   res.header('auth-token',token).send({
    message:"logged in sucessful",
    login: true,
    token:token,
   });
});

module.exports = router;