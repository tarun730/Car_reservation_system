
const mysql = require('mysql2');
const con=mysql.createConnection({

host:"localhost",
user:"root",
password:"tarun", 
database:"carres"


})

module.exports=con

