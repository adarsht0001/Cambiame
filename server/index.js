const express=require('express')
const bodyParser = require('body-parser');
const app=express()
const cors= require('cors')

app.use(bodyParser.json());

app.use(cors())

app.post('/signup',(req,res)=>{
    console.log(req.body);
})

app.listen(5000,()=>{
    console.log("startes");
})