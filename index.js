const express = require("express");
const cookieParser = require("cookie-parser");
const database = require("./config/database")
const server = express();
require("dotenv").config();


server.use(express.json());
server.use(cookieParser());

database.connect();

server.use("/",(req,res)=>{
    res.send("Welcome to book management system.")
})

const port = process.env.PORT;
server.listen(port, ()=>{
    console.log(`Server started at post no. ${port}\nHappy Coding!`)
})
