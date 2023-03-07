const file = require('fs');     //to use file system module
var students = [];
var programs = [];

exports.initialize = () => {
    return new Promise ((resolve, reject) => {
        file.readFile('./data/students.json', (err,data) => {
            if (err) {
                reject ('unable to read file');
            }
            else {
                students = JSON.parse(data);
            }
        });

        file.readFile('./data/programs.json', (err,data)=> {
            if (err) {
                reject ('unable to read file');
            }
            else {
                programs = JSON.parse(data);
            }
        })
        resolve();
    })
};

exports.getAllStudents = () => {
    return new Promise ((resolve,reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(students);
        }
    })
};

exports.getInternatinalStudent = () => {
    return new Promise ((resolve, reject) => {
        var international_Student = students.filter(student => student.isInternational == true);
        if (international_Student.length == 0) {
            reject('no results returned');
        }
        resolve(international_Student);
    })
};

exports.getPrograms = () => {
    return new Promise((resolve,reject) => {
        if (programs.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (programs);
        }
    })
};

exports.addStudent = (studentData) => {
    studentData.isInternational==undefined ? studentData.isInternational = false : studentData.isInternational = true;
    studentData.studentId = students.length + 1;
    students.push(studentData);

    return new Promise((resolve,reject) => {
        if (students.length == 0) {
            reject ('no results');
        }
        else {
            resolve(students);
        }
    })
};

exports.getStudentByStatus = (status) => {
    return new Promise((resolve,reject) => {
        var std_status = students.filter(student => student.status == status);
        if (std_status.length == 0) {
            reject('Status no results');
        }
        resolve(std_status);
    })
};

exports.getStudentsByProgram = (program) => {
    return new Promise ((resolve,reject) => {
        var std_programs = students.filter(student => student.program == program);        
        if (std_programs.length == 0) {
            reject ('program not found');
        }
        resolve(std_programs);
    })
};

exports.getStudentByCredentials = (credentials) => {
    return new Promise ((resolve,reject) => {
        var std_Credentials = students.filter(student => student.expectedCredentials == credentials);
        if (std_Credentials.length == 0) {
            reject('credentials not found');
        }
        resolve(std_Credentials);
    })
};

exports.getStudentById = (value) => {
    return new Promise((resolve,reject) => {
        var std_id = students.filter(student => student.studentId == value);
        if (std_id.length == 0) {
            reject('no student found');
        }
        resolve(std_id[0]);
    })
};

exports.updateStudent = (studentData) => {
    return new Promise ((resolve,reject) => {
        students.forEach((std_obj) => {
            if (std_obj.studentId == studentData.studentId) {
                students.splice(studentData.studentId-1, 1, studentData);
                resolve();
            }
        })
    })
};