const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const registerroute = require('./routes/routes');
const loginroute = require('./routes/login');
const postsroute = require('./routes/posts');
const get_profileroute = require('./routes/get_profile');
const editprofile = require('./routes/editprofile');
const get_profileroute2 = require('./routes/follow');
const profilepic = require('./routes/updateprofilepic');
const search = require('./routes/search');
const fileupload = require('express-fileupload');
const AWS = require('aws-sdk');


app.use(fileupload());
const corse = require('cors');
const dotenv = require('dotenv');

dotenv.config();
app.use(corse());
app.use(bodyparser.json());
app.use(express.json());



app.use('/register',registerroute);
app.use('/login',loginroute);
app.use('/posts',postsroute);
app.use('/get_profile',get_profileroute);
app.use('/editprofile',editprofile);
app.use('/follow-user',get_profileroute2);
app.use('/',profilepic);
app.use('/search',search);


//connect to databse

mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true, useUnifiedTopology: true },
()=>{

    console.log('connected to database');
})


app.listen(8000);