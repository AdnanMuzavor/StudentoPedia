// => This file deals with establishing connection with the Database
const mysql=require("mysql");

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Avatars"
})

module.exports=conn;