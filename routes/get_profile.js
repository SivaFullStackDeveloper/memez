const express = require('express');
const router = express.Router();
const verify = require('./verify_token');
const User = require('../models/register');

router.post('/',verify,async(req,res)=>{
    const user = await User.findOne({name:req.body.name});
    if(!user) return res.status(401).send({result:"Access denied"});

  
        res.status(200).send({
            name:user.name,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profilepicture:user.profilepicture,
            youtubelink:user.youtubelink,
            instagramlink:user.instagramlink,
        });
    

})


router.post('/editprofile/:key',verify,async(req,res)=>{

    const filter = {name:req.body.name};
    const update = {youtubelink:req.body.youtubelink,instagramlink:req.body.instagramlink};
 const user =  await User.findOneAndUpdate(filter, update,{
        returnOriginal: false
      });

      if(!user) return res.status(401).send({result:"Access denied"});
      res.status(200).send({
        name:user.name,
        email:user.email,
        followers:user.followers,
        following:user.following,
        profilepicture:user.profilepicture,
        youtubelink:user.youtubelink,
        instagramlink:user.instagramlink,
    });
    

})

module.exports = router;