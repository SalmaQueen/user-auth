const jwt = require('jsonwebtoken')


//CREATING A MIDLLEWARE FOR PRIVATE ROUTES
// const auth =(req, res, next)=>{

//     const token =res.header('auth-token');

//     if(!token) return res.status(401).send("Access Denied!");


//     try{

//         const verified= jwt.verify(token, process.env.TOKEN_SECRET);

//         if(verified) return req.user=verified;
//         next();


//     }

//     catch(err){
//         res.status(400).send("Invalid token");
//     }

// }
module.exports = function(req, res, next){

    const token =res.header('auth-token');

    if(!token) return res.status(401).send("Access Denied!");


    try{

        const verified= jwt.verify(token, process.env.TOKEN_SECRET);

        req.user=verified;
        next();



    }

    catch(err){
        res.status(400).send("Invalid token");
    }
}

