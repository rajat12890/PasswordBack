import { app } from "./app.js";
// import dotenv from"dotenv"
import { connectDB } from "./DB/connect.js";
import dotenv from 'dotenv'
dotenv.config()

//uncaught error


connectDB()

app.listen(8015,()=>{
    console.log(`Server is working on http://localhost:${8015}`);
})

