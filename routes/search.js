const express = require('express');
const router = express.Router();
const verify = require('./verify_token');
const User = require('../models/register');

router.post('/:key',verify,async(req,res)=>{
    const searchuser = req.params.key;
    const searchname = await User.find(
        {"$or":[{name:{$regex:req.params.key}}]}
        
        ).then
    ((data)=>{

        res.status(200).send({
           data
        });
    })

})



module.exports = router;