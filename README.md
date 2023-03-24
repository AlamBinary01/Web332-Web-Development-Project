 WEB322 Web Development Project: seneca-web322
Getting Started
This Node.js web application is developed using Visual Studio Code. To obtain a copy of the project, simply clone the master branch.
Prerequisites

Should you wish to modify/run this Node.js web application on your local machine, you will need to use an IDE such as Visual Studio Code and install Node.js.

In addition, you will need to install the following dependencies:

    Express.js
    Handlebars.js
    Body-parser

Installation

To install Node.js, please visit https://nodejs.org/ to download the current release. Please follow the on screen instructions to install the current release.

To install the dependencies, simply run the following commands:

npm install express --save

npm install express-handlebars --save

npm install body-parser --save
To simply access this web application online, please visit: https://web322-wcng1-assign7.herokuapp.com/
Built With

    Node.js - JavaScript runtime
    Express.js - Web application framework
    Body-parser - Parses incoming request bodies in a middleware
    Handlebars.js - Templates the layout
    HTML
    CSS
    JavaScript
License

This project is licensed under the ISC License

A special note to current Seneca WEB322 students:
Keep Calm, Code On and Don't Plagiarize!
It is okay to read someone's code and learn from it. If you find my code useful and would like to include it in your solution then please reference it.
Project Specifications
Iteration 2

An ongoing development that:

    creates a web app that uses multiple routes which serve static files (HTML and CSS)
    serves as the "scaffolding" for future assignments

Iteration 3

An ongoing development that:

    extends the app to listen on a number of additional routes using Express.js
    handles requests for data on mock datasets using a custom (promise driven) module

Iteration 4

An ongoing development that:

    extends the app to listen on a number of additional routes
    works with Handlebars.js as a templating engine
    handles POST routes
    processes POST data from server
    updates the existing routes to return rendered HTML pages using the "express-handlebars" modules
    creates web forms using HTML and Bootstrap Forms classes
    extends data-service.js module to accommodate requests to add or update mock datasets
