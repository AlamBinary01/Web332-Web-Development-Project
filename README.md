# Fall 2023 WEB322 Web Development Project: seneca-web322

## Getting Started
This Node.js web application is developed using Visual Studio Code. To obtain a copy of the project, simply clone the master branch. 

### Prerequisites
Should you wish to modify/run this Node.js web application on your local machine, you will need to use an IDE such as Visual Studio Code and install Node.js. 

In addition, you will need to install the following dependencies:
* [Express.js](https://expressjs.com/)
* [Handlebars.js](http://handlebarsjs.com/)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [mongoose](http://mongoosejs.com/)
* [client-sessions](https://www.npmjs.com/package/client-sessions)
* [bcrypt](https://www.npmjs.com/package/bcryptjs)

### Installation
To install Node.js, please visit https://nodejs.org/ to download the current release. Please follow the on screen instructions to install the current release. 

To install the dependencies, simply run the following commands:
```
npm install express --save
```
```
npm install express-handlebars --save
```
```
npm install body-parser --save
```
```
npm install sequelize --save
```
```
npm install mongoose --save
```
```
npm install client-sessions --save
```
```
npm install bcryptjs --save
```

## Built With
* [Node.js](https://nodejs.org/) - JavaScript runtime
* [Express.js](https://expressjs.com/) - Web application framework
* [Body-parser](https://www.npmjs.com/package/body-parser) - Parses incoming request bodies in a middleware
* [Handlebars.js](http://handlebarsjs.com/) - Templates the layout
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/) - Framework for building responsive application
* [sequelize](http://docs.sequelizejs.com/) - Promised-based Node.js ORM for Postgres
* [mongoose](http://mongoosejs.com/) - A MongoDB object modeling module for node.js
* [client-sessions](https://www.npmjs.com/package/client-sessions) - Session manager using encrypted tamper-free cookies
* [bcrypt](https://www.npmjs.com/package/bcryptjs) - A password hashing function
* HTML
* CSS
* JavaScript


A special note to current Seneca WEB322 students:  
**Keep Calm, Code On and Don't Plagiarize!**  
It is okay to read someone's code and learn from it. If you find my code useful and would like to include it in your solution then please reference it.

## Project Specifications
### Iteration 2
An ongoing development that:
* creates a web app that uses multiple routes which serve static files (HTML and CSS)
* serves as the "scaffolding" for future assignments
* deploys a web app that is hosted on Cyclic

### Iteration 3
An ongoing development that:
* extends the app to listen on a number of additional routes using [Express.js](https://expressjs.com/)
* handles requests for data on mock datasets using a custom (promise driven) module

### Iteration 4
An ongoing development that:
* extends the app to listen on a number of additional routes
* works with [Handlebars.js](http://handlebarsjs.com/) as a templating engine
* handles POST routes
* processes POST data from server
* updates the existing routes to return rendered HTML pages using the "express-handlebars" modules
* creates web forms using HTML and Bootstrap Forms classes
* extends data-service.js module to accommodate requests to add or update mock datasets

### Iteration 5
An ongoing development that:
* works with Postgres data source on the server (data persistence)
* refactors the application

### Iteration 6
An ongoing development that:
* works with MongoDB data source on the server using [mongoose](http://mongoosejs.com/)
* works with data in views (.hbs templates)
* adds a comments section to about.hbs
* manages sessions using [client-sessions](https://www.npmjs.com/package/client-sessions)
* incorporate data persistence to add user registration functionality
* adds Login/Logout functionality to control authentication and authorization
* add one way password encryption to store and work with passwords using [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
