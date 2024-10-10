import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config(
    {
        path:"./c.env"
    }
)
const connectDB=async()=>{
   
    console.log(process.env.MONGOOSE_URI);
        const connectionInstance=await mongoose.connect(`${process.env.MONGOOSE_URI}}/${"expenses"}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  
}

export{connectDB}