const express = require('express');
const User = require('../models/register');
const AWS = require('aws-sdk');
const router = express.Router();
const verify = require('./verify_token');
const dotenv = require('dotenv');
dotenv.config();

router.post('/:key',async(req,res)=>{
    AWS.config.update({
        accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    region:process.env.S3_BUCKET_REGION
    })
    const s3 = new AWS.S3();
    const filecontent =   Buffer.from(req.files.data.data,'binary');

    const params={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:req.files.data.name,
        Body:filecontent
    }
    s3.upload(params,async(err,data)=>{
        if(err){
            throw err;
        }else{
            const filter = {name:req.params.key};
            const update = {profilepicture:data['Location']};
         const user =  await User.findOneAndUpdate(filter, update,{
                returnOriginal: false
              });
              
              res.status(200).send({
                name:user.name,
                email:user.email,
                followers:user.followers,
                following:user.following,
                profilepicture:user.profilepicture,
            });
        }
        

       
    })
  
    
 
  
    // const user =  await User.findOne({
    //     name:req.params.key
    // });
    // if(!user) res.send({data:"sorry something went wrong"});
    // user.updateOne({
    //     profilepicture:'1234568790'
    // });
    // console.log(url);
   
     })


module.exports = router;