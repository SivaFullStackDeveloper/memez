const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const register = mongoose.Schema({
   
   name:{
        type:String,
        min:6,
        max:25,
        require:true,

    },
    password:{
        type:String,
        require:true,
    },
    instagramlink:{
        type:String,
    },
    youtubelink:{
        type:String,
    },

    email:{
        type:String,
        require:true,
    },
    following: [
        {
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
        }

    ],
    followers: [
        {
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
        }
    ],
    date:{
        type:Date,
        default:Date.now,
    },
})


module.exports = mongoose.model('register',register);