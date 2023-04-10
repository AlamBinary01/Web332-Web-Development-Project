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

