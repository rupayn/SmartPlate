import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
const app = express()
const port=process.env.PORT||8000
app.use(cors({
    origin:'*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    console.log("GET")
    res.json({
        message:"Hello from Express Server"
    })
})

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}/`)
 
})