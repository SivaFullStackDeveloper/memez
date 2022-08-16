
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const verify = require('./verify_token');
dotenv.config();

router.post('/',verify,async(req,res)=>{
    res.json({
        posts:"this is a description",
        data:'random data'
    })

})


module.exports = router;