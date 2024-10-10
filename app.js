import express from "express"
import { passwordRouter } from "./routes/password.routes.js"
import { notesRouter } from "./routes/notes.routes.js"
import cors from "cors"
import router from "./routes/user.routes.js"
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use('/api/v1/pass',passwordRouter)
app.use('/api/v1/notes',notesRouter)
app.use('/api/v1/auth',router)
export{app}
