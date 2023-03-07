/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy. 
   No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ______________________ Student ID: ______________ Date: ________________
*
*  Online (Cyclic) Link: 
*
********************************************************************************/ 

var express = require("express");
var path = require("path");
var dataService = require("./data-service.js");
var app = express();

//to recognize the css files
app.use(express.static("public/css")); 
app.use(express.static("img"));

var PORT = process.env.PORT || 8080;


function onHttpStart() {
  console.log("Express http server listening on: " + PORT);
}


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});


app.get("/students", function (req, res) {
  dataService
    .getAllStudents()
    .then((data) => {

      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});



app.get("/internationalStudents", function (req, res) {
  dataService
    .getInternationStudents()
    .then((data) => {
      
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});



app.get("/programs", function (req, res) {
  dataService
    .getPrograms()
    .then((data) => {
      
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});



dataService
  .initialize()
  .then(() => {
   
    app.listen(PORT, onHttpStart);
  })
  .catch((err) => {
    console.log(err);
  });
