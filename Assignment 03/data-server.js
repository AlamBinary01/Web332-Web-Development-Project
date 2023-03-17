const { resolve } = require("path");

let images = [];

function addImage(imageUrl) {
    return new Promise((resolve, reject) => {
        images.push(imageUrl);
        resolve();
    });
}

function getImages() {
    return new Promise((resolve, reject) => {
        if (images.length > 0) {
            resolve(images);
        } else {
            reject("no results returned");
        }
    });
}
function addStudent(studentData) {
    return new Promise((resolve, reject) => {
      try {
        if (studentData.isInternationalStudent === undefined) {
          studentData.isInternationalStudent = false;
        } else {
          studentData.isInternationalStudent = true;
        }
  
        let maxStudentID = 0;
        for (let student of students) {
          let studentID = parseInt(student.studentID);
          if (studentID > maxStudentID) {
            maxStudentID = studentID;
          }
        }
  
        studentData.studentID = (maxStudentID + 1).toString();
        students.push(studentData);
  
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


  const students = [
    {
      studentID: "543147156",
      firstName: "Adrien",
      lastName: "De Ruel",
      program: "CPA",
      status: "Full Time",
      expectedCredential: "Diploma"
    },
    {
      studentID: "543147157",
      firstName: "Emma",
      lastName: "Brown",
      program: "CPA",
      status: "Part Time",
      expectedCredential: "Degree"
    },
    {
      studentID: "543147158",
      firstName: "John",
      lastName: "Doe",
      program: "Business",
      status: "Full Time",
      expectedCredential: "Certificate"
    }
  ];
  
  const getStudentsByStatus = status => {
    return new Promise((resolve, reject) => {
      const results = students.filter(student => student.status === status);
      if (results.length > 0) {
        resolve(results);
      } else {
        reject("No results returned");
      }
    });
  };
  
  const getStudentsByProgramCode = programCode => {
    return new Promise((resolve, reject) => {
      const results = students.filter(student => student.program === programCode);
      if (results.length > 0) {
        resolve(results);
      } else {
        reject("No results returned");
      }
    });
  };
  
  const getStudentsByExpectedCredential = credential => {
    return new Promise((resolve, reject) => {
      const results = students.filter(student => student.expectedCredential === credential);
      if (results.length > 0) {
        resolve(results);
      } else {
        reject("No results returned");
      }
    });
  };
  
  const getStudentById = sid => {
    return new Promise((resolve, reject) => {
      const result = students.find(student => student.studentID === sid);
      if (result) {
        resolve(result);
      } else {
        reject("No result returned");
      }
    });
  };
  function getAllStudents(student){return student}

    addStudent = function(studentData) {
    return new Promise(function(resolve, reject) {
      if (studentData.isInternationalStudent === undefined) {
        studentData.isInternationalStudent = false;
      } else {
        studentData.isInternationalStudent = true;
      }
  
      let maxStudentId = 0;
      for (let i = 0; i < students.length; i++) {
        let currentStudentId = parseInt(students[i].studentId);
        if (currentStudentId > maxStudentId) {
          maxStudentId = currentStudentId;
        }
      }
  
      studentData.studentId = (maxStudentId + 1).toString();
  
      students.push(studentData);
      resolve();
    });
  };
module.exports = { addImage, getImages, addStudent,getStudentById,getStudentsByExpectedCredential,getStudentsByProgramCode,getStudentsByStatus,getAllStudents };
