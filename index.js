const { Router } = require('express');

const express= require('express');
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes

const authRoute= require('./routes/auth');
//add the post route here

const postRoute= require('./routes/posts')

//config
dotenv.config();

//to use dotenv we do..

// const uri= process.env.DB_CONNECT;

//connect to DB


// mongoose.connect('process.env.DB_CONNECT', { useNewUrlParser: true},
// ()=> console.log("conncted to db"))

mongoose.connect(process.env.DB_CONNECT, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
   
  })
   .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// mongoose.connect(`${confidential}`,
// ()=> console.log("conncted to db"))

//Middleware

app.use(express.json());


//create route middlewares

app.use('/api/user', authRoute);
//add the next route here
app.use('/api/posts', postRoute)


app.listen(3000,()=> console.log("server is up and running"));