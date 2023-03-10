const express=require('express')
const app=express()
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const cors= require('cors')

const login=require('./routes/userlogin')

app.use(bodyParser.json());

app.use(cors())

mongoose.connect('mongodb://localhost:27017/Social',{
    useNewUrlParser: true
  }).then(()=>console.log('Db conneted')).catch((err)=>{
    console.log(err);
  })

app.use("/",login)


app.listen(5000,()=>{
    console.log("server started");
})