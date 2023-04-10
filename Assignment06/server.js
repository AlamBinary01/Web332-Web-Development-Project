/*********************************************************************************
* WEB322 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Jannatul Reshmen Chowdhury Sumonti Student ID: 156276214 Date: 03/04/2023
*
* Online Link: ________________________________________________________
*
********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const dataservice = require(__dirname + "/data-service.js");
const exphbs = require('express-handlebars');
const dataServiceAuth = require(__dirname + "/data-service-auth.js");
const clientSessions = require('client-sessions');

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
});

const upload = multer({storage: storage});

app.engine('.hbs', exphbs({ 
    extname: ".hbs", 
    defaultLayout: "main",
    helpers: {
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + '><a href="' + url + '">' + options.fn(this) + '</a></li>'; },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }           
    } 
}));

app.set('view engine', '.hbs');

onHttpStart = () => {
    console.log("Express http server listening on port " + HTTP_PORT);
}

//use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next) {
    let route = req.baseUrl+req.path;
    app.locals.activeRoute = (route == "/") ? "/":route.replace(/\/$/,"");
    next();
});

app.use(clientSessions( {
    cookieName: "session",
    secret: "web_a6_secret",
    duration: 2*60*1000,
    activeDuration: 1000*60
}));

app.use((req,res,next) => {
    res.locals.session = req.session;
    next();
});

ensureLogin = (req,res,next) => {
    if (!(req.session.user)) {
        res.redirect("/login");
    }
    else { next(); }
};

//home
app.get('/', (req, res) => {
    res.render("home");
});

//otherwise /home would return an error
app.get('/home', (req, res) => {
    res.render("home");
});


//about
app.get('/about', (req, res) => {
    res.render("about");
});


//students
app.get("/students", ensureLogin,(req, res) => {
  res.redirect("/students")
});

//images
app.get('/images/add', ensureLogin, (req,res) => {
    res.render(path.join(__dirname + "/views/addImage.hbs"));
});

app.post("/images/add", ensureLogin, upload.single("imageFile"), (req,res) => {
    res.redirect("/images");
});

app.get("/images", ensureLogin, (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.render("images", { data: items });
    })
});

app.get("/programs",ensureLogin,(req,res)=>{
    res.redirect("/programs")
})

//login
app.get("/login", (req,res) => {
    res.render("login");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", (req,res) => {
    dataServiceAuth.registerUser(req.body)
    .then(() => res.render("register", {successMessage: "User created" } ))
    .catch (err => res.render("register", {errorMessage: err, userName:req.body.userName }) )
});

app.post("/login", (req,res) => {
    req.body.userAgent = req.get('User-Agent');
    dataServiceAuth.checkUser(req.body)
    .then(user => {
        req.session.user = {
            userName:user.userName,
            email:user.email,
            loginHistory:user.loginHistory
        }
        res.redirect("/home");
    })
    .catch(err => {
        res.render("login", {errorMessage:err, userName:req.body.userName} )
    }) 
});

app.get("/logout", (req,res) => {
    req.session.reset();
    res.redirect("/login");
});

app.get("/userHistory", ensureLogin, (req,res) => {
    res.render("userHistory", {user:req.session.user} );
});


app.use((req, res) => {
    res.status(404).end('404 PAGE NOT FOUND');
});

dataservice.initialize()
.then(dataServiceAuth.initialize())
.then(() => {
    app.listen(HTTP_PORT, onHttpStart())
}).catch (() => {
    console.log('promises unfulfilled');
});