//Import the connection
const conn=require("./connection");
const express=require("express");
const app=express();

//We shall be sending data in json format hence 
app.use(express.json());

//Use connectiona nd connect with database
conn.connect((error)=>{
    if(error){
        console.log(`Could not connect with database due to: ${error}`)
        return;
    }
    console.log("MySQL database connected");
})

//Create server using express
app.listen(4000,()=>{
    console.log("Listening to port 4000");
})
