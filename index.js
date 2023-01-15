 const express=require("express")
const {connection}=require("./config/db")
require("dotenv").config()
const {userRouter}=require("./routee/user.router")




const app=express()
app.use(express.json())
app.get("/",(req,res)=>
{
    res.send({"message":"Welcome to home page"})

})

app.use("/users", userRouter)

app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("connected to data base")
    } catch (error) {
        
    }
    console.log(`server is runnind at port :==>${process.env.port}`)
})