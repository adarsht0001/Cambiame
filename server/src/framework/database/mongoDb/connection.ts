import mongoose from "mongoose"
import configKeys from "../../../config"


const connectDB = async () => {
    try {
      await mongoose.connect(configKeys.mongoDbUrl)
      console.log(`Database connected successfully`)
    } catch (error) {
      console.log(error)
    }
  }
  
  export default connectDB