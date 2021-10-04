const pg=require('pg');
const pool = new pg.Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password : 'root',
    database : 'Newdb',
    max: 1000,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 50000000,
   });
module.exports=pool;