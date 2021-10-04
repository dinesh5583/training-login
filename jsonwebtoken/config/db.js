const pg=require("pg");
const pool=new pg.Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password : 'root',
    database : 'jsonwebtoken'
});

module.exports=pool;