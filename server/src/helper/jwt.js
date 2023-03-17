const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports={
    createToken:(user)=>{
        return jwt.sign({token:user},process.env.ACESS_TOKEN_SCERET)
    }
}