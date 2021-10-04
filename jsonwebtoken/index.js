const express=require("express");
const cors=require("cors");
const pool=require("./config/db");
const router = require("./routes/userroutes");
const app=express();


app.use(express.json());
app.use(cors());
app.use('/api',router)
app.listen(5000,()=>{
    console.log("server is running on port 5000")
})