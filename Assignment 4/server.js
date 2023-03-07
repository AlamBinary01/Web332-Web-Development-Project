// *********************************************************************************
// *  WEB322 – Assignment 04
// *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
// *  of this assignment has been copied manually or electronically from any other source 
// *  (including 3rd party web sites) or distributed to other students.
// * 
// *  Name: Jannatul Reshmen Chowdhury Sumonti Student ID: 156276214 Date: 07/03/2023
// *
// *  Online  Link: 
// *
// ********************************************************************************/ 


const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const dataservice = require(__dirname + "/data-service.js");
const exphbs = require('express-handlebars');
const HTTP_PORT = process.env.PORT || 8080;
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
    console.log('Express http server listening on port ' + HTTP_PORT);
}

//use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next) {
    let route = req.baseUrl+req.path;
    app.locals.activeRoute = (route == "/") ? "/":route.replace(/\/$/,"");
    next();
});

//home
app.get('/', (req, res) => {
    res.render(path.join(__dirname + "/views/home.hbs"));
});

//otherwise /home would return an error
app.get('/home', (req, res) => {
    res.render(path.join(__dirname + "/views/home.hbs"));
});


//about
app.get('/about', (req, res) => {
    res.render(path.join(__dirname + "/views/about.hbs"));
});


//students
app.get("/students", (req, res) => {
    if (req.query.status) {
        dataservice.getStudentByStatus(req.query.status).then((data) => {
            res.render("students",{students: data});
        }).catch((err) => {
            res.render({message: "no results"});
        })
    }
    else if (req.query.program) {
        dataservice.getStudentsByProgram(req.query.program).then((data) => {
            res.render("students",{students: data});
        }).catch((err) => {
            res.render({message: "no results"});        
        })
    }
    else if (req.query.expectedCredentials) {
        dataservice.getStudentByCredentials(req.query.expectedCredentials).then((data) => {
            res.render("students",{students: data});
        }).catch((err) => {
            res.render({message: "no results"});
        })
    }
    else {
        dataservice.getAllStudents().then((data) => {
            res.render("students",{students: data});
        }).catch((err) => {
            res.render({message: "no results"});
        })
    }
});

app.get('/student/:value', (req,res) => {
    dataservice.getStudentById(req.params.value).then((data) => {
        res.render("student", { student: data });
    }).catch((err) => {
        res.render("student",{message:"no results"});
    })
});

app.get('/students/add',(req,res) => {
    res.render(path.join(__dirname + "/views/addStudent.hbs"));
});

app.post('/students/add', (req,res) => {
    dataservice.addStudent(req.body).then(() => {
        res.redirect("/students");
    })
});

app.post('/student/update', (req, res) => {
    dataservice.updateStudent(req.body).then(() => {
        res.redirect("/students");
    })
});


//images
app.get('/images/add',(req,res) => {
    res.render(path.join(__dirname + "/views/addImage.hbs"));
});

app.post("/images/add", upload.single("imageFile"), (req,res) => {
    res.redirect("/images");
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err,items) {
        res.render("images", { data: items });
    })
});


//InterNational Student
app.get("/internationalStudent", (req, res) => {
    dataservice.getInternatinalStudent().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});


//Programs
app.get("/programs", (req, res) => {
    dataservice.getPrograms().then((data) => {
        res.render("programs", {programs:data});
    }).catch((err) => {
        res.render({message: "no results"});
    })
});


app.use((req, res) => {
    res.status(404).end('404 PAGE NOT FOUND');
});

dataservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart())
}).catch (() => {
    console.log('promises unfulfilled');
});