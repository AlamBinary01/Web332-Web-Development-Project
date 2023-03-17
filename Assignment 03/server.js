const express = require("express");
const app = express();
const path = require("path");
const body_parser = require("body-parser");
const cloudinary_ = require("./middleware/cloundinary");
const port = process.env.port | 8080;
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");


const upload = multer({ storage: multer.memoryStorage() });
const dataService = require("./data-server");


app.use(express.static("public"));
// set view file
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
//default page
app.get("/", (req, res) => {
  res.status(200).render("home");
});


app.get("/about", (req, res) => {
  res.status(200).render("about");
});
app.get("/images/add", (req, res) => {
  res.render("addImage");
});

// Add the following route for image uploads
app.post("/images/add", upload.single("imageFile"), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      return result;
    }

    upload(req).then((uploaded) => {
      processForm(uploaded.url);
    });
  } else {
    processForm("");
  }

  function processForm(imageUrl) {
    dataService
      .addImage(imageUrl)
      .then(() => {
        res.redirect("/images");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

// Add the following route for retrieving images
app.get("/images", (req, res) => {
  dataService
    .getImages()
    .then((images) => {
      res.json({ images });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//add Student
app.get("/students/add", (req, res) => {
  res.status(200).render("addStudent");
});
//add student route
app.post("/students/add", (req, res) => {
  dataService
    .addStudent(req.body)
    .then(() => {
      res.status(200).send("Student Added");
      res.json();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// PART # 4
app.get("/students", (req, res) => {
  let status = req.query.status;
  let program = req.query.program;
  let credential = req.query.credential;

  if (status) {
    dataService
      .getStudentsByStatus(status)
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else if (program) {
    dataService
      .getStudentsByProgramCode(program)
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else if (credential) {
    dataService
      .getStudentsByExpectedCredential(credential)
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    dataService
      .getAllStudents()
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

app.get("/student/:id", (req, res) => {
  let id = req.params.id;
  dataService
    .getStudentById(id)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/student/:id", function (req, res) {
  let studentId = req.params.id;
  let student = dataService.getStudentById(studentId);
  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }
  return res.send(student);
});

app.listen(port, () => {
  console.log("Server Listening on http://localhost:8080");
});
