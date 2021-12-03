const mongoose = require('mongoose');

//create schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255



    },
   password:{
        type: String,
        required: true,
        min: 1024,
        max: 6
        


    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('User', userSchema)