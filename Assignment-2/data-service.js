const fs = require("fs");
var students = [];
var programs = [];
module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
        try {
            fs.readFile('./data/students.json', (err, data) => {
                if (err) throw err;
                students = JSON.parse(data);
            })
            fs.readFile('./data/programs.json', (err, data) => {
                if (err) throw err;
                programs = JSON.parse(data);
            })
        } catch (ex) {
                      reject("Fail to Initialize");
                     }
        resolve("Sucessfully Initialize");
    })
    return promise;
};

module.exports.getAllStudents = function () {

    var promise = new Promise((resolve, reject) => {
       if(students.length === 0) {
        var err = "No data of Employees";
        reject({message: err});
       }  

    resolve (students);
    })
    return promise;
};

module.exports.getInternationStudents = function () {

    var lInternationalStudent = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < students.length; i++){
           if (students[i].isInternational == true) {
           lInternationalStudent.push(students[i]);
           }
       }

       if(lInternationalStudent.length === 0) {
        var err = "No data of Manager";
        reject({message: err});
       }  

    resolve (lInternationalStudent);
    })
    return promise;
};

module.exports.getPrograms = function () {

    var promise = new Promise((resolve, reject) => {
        if(programs.length === 0) {
         var err = "No data of Department";
         reject({message: err});
        }  
 
     resolve (programs);
     })
     return promise;
};