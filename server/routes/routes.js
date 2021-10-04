const express=require("express");
const pool = require("../config/db");
const router=express.Router();

router.post("/todo",async(req,res)=>{
    try{
        const {name}=req.body;
        const newTodo=await pool.query(
            `insert into todo_table(name) values($1) returning *`,
            [name]
        );
        res.json(newTodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})
router.get("/todo",async(req,res)=>{
    try{
        const newTodo=await pool.query(
            `select * from todo_table`
        );
        res.json(newTodo.rows);
    }catch(err){
        console.log(err.message);
    }
})

router.get("/todo/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const newTodo=await pool.query(
            `select * from todo_table where todo_id=$1`,[id]
        );
        res.json(newTodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

router.delete("/todo/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const newTodo=await pool.query(
            `delete from todo_table where todo_id=$1`,[id]
        );
        res.json("data has been deleted");
    }catch(err){
        console.log(err.message);
    }
})
module.exports=router;