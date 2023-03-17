/*********************************************************************************
*  WEB322 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jannatul Reshmen Chowdhury Sumonti Student ID: 156276214 Date: 16 March 2023
*
*  Online (Cyclic) URL:  
*
********************************************************************************/ 
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Jannatul Reshmen Chowdhury Sumonti - 156276214 ");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT,()=>{
    console.log("Listening on this port "+"http://localhost:8080/")
});