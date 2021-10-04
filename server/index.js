const express=require("express");
const pool=require("./config/db");
const cors=require("cors");
const router=require("./routes/routes")
const app=express();

app.use(express.json());
app.use(cors());

app.use('/api',router);
app.listen(5000,()=>{
    console.log("server has started on port 5000");
});
