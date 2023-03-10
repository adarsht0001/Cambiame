const express= require('express')
const router =express.Router()
let users=require('../model/userSchema')

router.post('/signup',async(req,res)=>{
    console.log('here');
    const user ={
        username:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    console.log(user);
    let user3= await users.create(user)
    // res.send("This is the login request")
})

router.post('/login',(req,res)=>{
    console.log('here');
})

module.exports=router