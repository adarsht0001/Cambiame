import {Schema,model} from "mongoose"
const userShema = new Schema(
    {
        email:{
            type:String,
            required: [true,"please add a email"],
            unique:true
        },
        password:{
            type:String,
            required: [true,"please add a password"]
        },
    },
)
const Admin = model("Admin",userShema,"admin")
export default Admin