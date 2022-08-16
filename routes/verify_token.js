const jwt = require('jsonwebtoken');


module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message:'Access Denied'});

    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.user = verified;
        next();
    }catch(err){
        res.status(404).send({message:'Access Denied Due to no Acess token'});
    }
}