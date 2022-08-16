const express = require('express');
const router = express.Router();
const verify = require('./verify_token');
const User = require('../models/register');

router.post("/:user_id", verify, (req,res) => {

    // check if the requested user and :user_id is same if same then 

    if (req.user.id === req.params.user_id) {
        return res.status(400).json({ alreadyfollow : "You cannot follow yourself"})
    } 

    User.findById(req.params.user_id)
        .then(user => {

            // check if the requested user is already in follower list of other user then 

            if(user.followers.filter(follower => 
                follower.user === req.user.id ).length > 0){
                return res.status(400).json({ 
                    alreadyfollow : "You already followed the user",

                })
            }

            user.followers.unshift({user:req.user.id});
            user.save()
            User.findOne({ email: req.user.email })
                .then(user => {
                    user.following.unshift({user:req.params.user_id});
                    user.save().then(user => res.json(user))
                })
                .catch(err => res.status(404).json({alradyfollow:"you already followed the user"}))
        })
})




module.exports = router;