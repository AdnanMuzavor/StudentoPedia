//Import the connection
const conn=require("./connection");
const express=require("express");
const app=express();

//Cdotenc to keep some data confidential
const dotenv=require("dotenv");
const StudentRouter = require("./routers/StudentRouters");
const ErrorHandler = require("./middleware/ErrorHandler");
dotenv.config();

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

//Use the StudentRouter to perform all studnet related CRUD operations
app.use("/api/student",StudentRouter);
app.use(ErrorHandler);

const port=process.env.PORT || 5000;
//Create server using express
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})
