// creating a route for posts

const router= require('express').Router();
const verify= require('./Privateroutes')

// through a private middleware next to the '/' that is the path
router.get('/', (req,res)=>{
    //to find specific user
    res.send(req.user);
    //to find individual user
    User.findbyone({_id: req.user});

    //to return json data for the posts
    res.json({
        posts:{
            title:"salma 1",
            body:"there was an early one"
        }
    })
})



module.exports= router;