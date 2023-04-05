import http from 'http'
import express,{Application, NextFunction} from 'express';
import serverConfig from './framework/webserver/server';
import connectDB from './framework/database/mongoDb/connection';
import Admin from "./framework/database/mongoDb/models/userModels";


const app:Application = express();

app.get('/',async(req,res)=>{
    const admin= await Admin.create({email:"dnaj",password:"sdafh"});
    console.log(admin);
    
})
const server = http.createServer(app)

connectDB();


serverConfig(server).startServer()
