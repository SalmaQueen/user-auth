const router= require('express').Router();
const User = require('../model/User')

// const validationRegister = require ('./validation');

const bcrypt= require('bcryptjs');
const jwt =require ('jsonwebtoken');



const Joi = require('@hapi/joi');

const schema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});




router.post('/register', async (req,res)=>{

    //lets validate here

    const { error } = schema.validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);


//check if the user exists in the db

const emailExist= await User.findOne({email: req.body.email});
if(emailExist) return res.status(400).send("Email already exists");

//hashing the password
const salt= await bcrypt.genSalt(10);

const hashedPassword= await bcrypt.hash(req.body.password, salt);




    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser=await user.save();
        res.send(savedUser);
        // res.send({user: user._id})

    }
    catch(err){
        res.status(400).send(err);
    }


});

//Login schema
const loginSchema = Joi.object({
    
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});


//LOGIN


router.post('/login', async (req, res)=>{
    // validation is what we need here too
    //schema will have email and password only
    const { error } = loginSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user= await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is not found!");

const validPass= await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send("invalid password!");
// res.send("success login")

//create and assign a token

const token= jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);

})


module.exports= router;