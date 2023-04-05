import { Application } from "express";
import UserRoute from "./user";

const router=(app:Application)=>{
    app.use('/',UserRoute())
}

export default router;
