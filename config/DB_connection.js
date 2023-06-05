// const mysql =require('mysql');
const mysql = require('mysql2');
const con=mysql.createConnection({

host:"localhost",
user:"root",
password:"tarun", 
database:"carres"


})

module.exports=con

// con.query(`select * from user`,(err,result,fields)=>{
//     if(err){
//         return console.log(err)
//     }

//     return console.log(result )
// })
// module.exports=con