# Web-Assignment

Objective:
Build upon the foundation established in Assignment 2 by providing new routes / views to support adding new students and uploading images.

NOTE: If you are unable to start this assignment because Assignment 2 was incomplete - email your professor for a clean version of the Assignment 2 files to start from (effectively removing any custom CSS or text added to your solution).
Specification:
For this assignment, we will be enhancing the functionality of Assignment 2 to include new routes & logic to handle file uploads and add students.  We will also add new routes & functionality to execute more focused queries for data (ie: fetch an student by id, all students by a program or status value, etc)
Part 1: Adding / Updating Static (.html) Files & Directories

Step 1: Modifying home.html & about.html
•	Open the home.html file from within the "views" folder
•	Add the following two entries to the <ul class="nav navbar-nav"> element:
o	<li><a href="/students/add">Add Student</a></li>
o	<li><a href="/images/add">Add Image</a></li>
•	Add the following entry as the first child element of the <ul class="nav navbar-nav navbar-right"> element
o	<li><a href="/images">Images</a></li>
•	Your "Home" page should now have a menu bar that looks like the following:

 
•	Update your "About" page with the same changes.  When complete, it should look like the following:

 
Step 2: Adding new routes in server.js to support the new views
•	Inside your server.js file add the following routes (HINT: do not forget __dirname & path.join):
o	GET /students/add
•	This route simply sends the file "/views/addStudent.html "
o	GET /images/add
•	This route simply sends the file "/views/addImage.html
Step 3: Adding new file 1: addStudent.html
•	Create a new file in your "views" directory called "addStudent.html" and open it for editing
•	Copy the contents of "home.html" and paste it in as a starting point.
•	Ensure that the "Add Student" item in the <ul class="nav navbar-nav"> …</ul> element is the only <li> with the class "active" (this will make sure the correct navigation element is "highlighted")
•	Remove all html code inside the <div class="row"> … </div>
•	Inside the (now empty) <div class="row"> … </div> element, use the html from the sample solution 
( https://web322-assignments-demo-2231.cyclic.app/students/add ) to reconstruct the "Add Student" form (HINT: You can right-click the page to "view source" - the html you want is within the <div class="row"> …</div> element)
Step 4: Adding new file 2: addImage.html
•	Create a new file in your "views" directory called "addImage.html" and open it for editing
•	Copy the contents of "home.html" and paste it in as a starting point.
•	Ensure that the "Add Image" item in the <ul class="nav navbar-nav"> …</ul> element is the only <li> with the class "active" (this will make sure the correct navigation element is "highlighted")
•	Remove all html code inside the <div class="row"> … </div>
•	Inside the (now empty) <div class="row"> … </div> element, use the html from the sample solution 
( https://web322-assignments-demo-2231.cyclic.app/images/add ) to reconstruct the "Add Image" form (HINT: You can right-click the page to "view source" - the html you want is within the <div class="row"> …</div> element)

Part 2: Adding Routes / Middleware to Support Image Uplo¬¬¬ads

Before we begin adding logic to our server, we must first register an account with an image hosting service.  This is required since Cyclic apps are serverless, meaning that serverless apps run on read-only file systems, in other words, it is impossible to store files to the web server on Cyclic. Therefore, instead of relying on Cyclic to store our images, we will instead use Cloudinary.

•	Sign up for a free account here: https://cloudinary.com/users/register/free (Choose "Programmable Media for image and video API" as your "product")
•	Validate your email address once Cloudinary sends you a "Welcome" email
•	Log in to Cloudinary and navigate to the "Dashboard"
•	Record your "Cloud Name", "API Key" and "API Secret" values (we will need them later).

Once you have successfully created your Cloudinary account and obtained the required information, we can proceed to update our code:

Step 1: Adding multer, cloudinary and streamifier 
•	Use npm to install the following modules:
o	 "multer" 
o	"cloudinary"
o	"streamifier"
•	Inside your server.js file "require" the libraries:
o	const multer = require("multer");
o	const cloudinary = require('cloudinary').v2
o	const streamifier = require('streamifier')

•	Set the cloudinary config to use your "Cloud Name", "API Key" and "API Secret" values, ie: 

cloudinary.config({
    cloud_name: 'Cloud Name',
    api_key: 'API Key',	
    api_secret: 'API Secret',
    secure: true
});

•	Finally, create an "upload" variable without any disk storage, ie:
o	const upload = multer(); // no { storage: storage } since we are not using disk storage

Step 2: Adding the "Post" route 
•	Add or update the route: POST /images/add
o	This route uses the middleware: upload.single("imageFile")
o	Inside the route, add the following code (from: the Cloudinary Documentation)
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            return result;
        }
    
        upload(req).then((uploaded)=>{
            processForm(uploaded.url);
        });
    }else{
        processForm("");
    }

    function processForm(imageUrl){
        
        // TODO: Process the image url on Cloudinary before redirecting to /images.
        // Note: the required "addImage" function is not created yet in data-service.js.
        // ... ...

    }   

Step 3: Updating "data-service.js" to support image uploads
•	Module Data: add a new array which should be declared "globally" within the module (after the 2 existing arrays – students and programs):
o	Images – type: array
•	Exported Functions: Add two functions which are used to work with the images dataset in the module. Each of the two functions must return promise that passes the data via its "resolve" method (or - if no data was returned, passes an error message via its "reject" method):
o	addImage(imageUrl) 
•	This function will push the imageUrl string onto the "images" array and resolve the promise.
o	getImages 
•	This function will provide the full array of image urls using the resolve method of the returned promise.
•	If for some reason, the length of the array is 0 (no results returned), this function must invoke the reject method and pass a meaningful message, ie: "no results returned".
Step 4: Adding "Get" route
•	Add the following route: 
o	GET /images
•	This route will return a JSON formatted string (res.json()) consisting of a single "images" property, which contains the URLs of images which have been stored on Cloudinary.
Step 5: Verify your Solution 
At this point, you should now be able to upload images using the "/images/add" route and see the full file listing on the "/images" route in the format, e.g.: 
{ "images": [
      "http://res.cloudinary.com/seneca-web322/image/upload/v1675456765/kqbzfcwgmaxnx4ybx75a.jpg", 
      "http://res.cloudinary.com/seneca-web322/image/upload/v1675509409/whbjegu0e8d3euc9piof.png"
] } .

Part 3: Adding Routes / Middleware to Support Adding Students

Step 1: Adding the built-in "express.urlencoded" middleware 
•	For handling regular (text) form data and access the data on req.body, add the express.urlencoded({ extended: true }) middleware (using app.use()).
Step 2: Adding "Post" route
•	Add the following route: 
o	POST /students/add
•	This route makes a call to the (promise-driven) addStudent(studentData) function from your data-service.js module (function to be defined below).  It will provide req.body as the parameter, ie "data.addStudent(req.body)". 
•	When the addStudent function resolves successfully, redirect to the "/students" route.  Here we can verify that the new student was added
Step 3: Adding "addStudent" function within data-service.js
•	Create the function "addStudent(studentData)" within data-service.js according to the following specification: (HINT: do not forget to add it to module.exports)
o	Like all functions within data-service.js, this function must return a Promise
o	If studentData.isInternationalStudent is undefined, explicitly set it to false, otherwise set it to true (this gets around the issue of the checkbox not sending "false" if it's unchecked)
o	To set the studentID property of studentData, you need to do the followings:
•	In data/students.json or the "global" students array, the data type of the studentID property is string. So, try to get the number values corresponding to the studentID string values in the students array, then find the maximum number value, for example 999827145.
•	The maximum number value plus one (1) will be used for the new studentID of studentData, and don't forget to convert it to string type. This will have the effect of setting the first new student number to "999827146", and so on.
o	Push the updated studentData object onto the "students" array and resolve the promise.
Step 4: Verify your Solution 
At this point, you should now be able to add new students using the "/students/add" route and see the full student listing on the "/students" route.

Part 4: Adding New Routes to query "Students"

Step 1: Update the "/students" route 
•	In addition to providing all of the students, this route must now also support the following optional filters (via the query string)
o	/students?status=value 
	return a JSON string consisting of all students where value could be either "Full Time" or "Part Time" - this can be accomplished by calling the getStudentsByStatus(status) function of your data-service (defined below)
o	/students?program=value 
	return a JSON string consisting of all students where value could be one of "ACF", "AVO", "DAN", "CPP", "CPA", …  (there are currently 10 programs in the dataset) " - this can be accomplished by calling the getStudentsByProgramCode(programCode) function of your data-service (defined below)
o	/students?credential=value 
	return a JSON string consisting of all students where value could be one of "Diploma", "Degree" and "Certificate" (there are currently 3 (expected) credentials in the dataset) " - this can be accomplished by calling the getStudentsByExpectedCredential(credential) function of your data-service (defined below)
o	/students
	return a JSON string consisting of all students without any filter (existing functionality)
Step 2: Add the "/student/value" route 
•	This route will return a JSON formatted string containing the student whose studentID matches the value.  For example, once the assignment is complete, http://localhost:8080/student/408862098  would return the student: Vivi Foulks - this can be accomplished by calling the getStudentById(sid) function of your data-service (defined below).

Part 5: Updating "data-service.js" to support the new "Student" routes

Note: All of the below functions must return a promise (continuing with the pattern from the rest of the data-service.js module)

Step 1: Add the getStudentsByStatus(status) Function  
•	This function will provide an array of "student" objects whose status property matches the status parameter (ie: if status is "Full Time" then the array will consist of only "Full Time" students) using the resolve method of the returned promise.  
•	If for some reason, the length of the array is 0 (no results returned), this function must invoke the reject method and pass a meaningful message, ie: "no results returned".
Step 2: Add the getStudentsByProgramCode(programCode) Function  
•	This function will provide an array of "student" objects whose program property matches the programCode parameter (ie: if programCode is "CPA" then the array will consist of only students who have to program property with the "CPA" ) using the resolve method of the returned promise.  
•	If for some reason, the length of the array is 0 (no results returned), this function must invoke the reject method and pass a meaningful message, ie: "no results returned".
Step 3: Add the getStudentsByExpectedCredential(credential) Function  
•	This function will provide an array of "student" objects whose expectedCredential property matches the credential parameter (ie: if credential is "Diploma" then the array will consist of only students whose expectedCredential property values are "Diploma") using the resolve method of the returned promise.  
•	If for some reason, the length of the array is 0 (no results returned), this function must invoke the reject method and pass a meaningful message, ie: "no results returned".
Step 4: Add the getStudentById(sid) Function  
•	This function will provide a single  "student" object whose studentID property matches the sid parameter (ie: if sid is "543147156" then the "student" object returned will be "Adrien De Ruel" ) using the resolve method of the returned promise.  
•	If for some reason, the student cannot be found, this function must invoke the reject method and pass a meaningful message, ie: "no result returned".

Part 6: Pushing to Cyclic
•	Once you are satisfied with your application, deploy it to Cyclic:
o	Ensure that you have checked in your latest code using git (from within Visual Studio Code)
o	Create a GitHub (public, remote) repository.
o	Connect to local Git repository to GitHub.
o	Connect the GitHub repository to Cyclic.
o	Change the GitHub repository to “Private”

•	IMPORTANT NOTE: Since we are using an "unverified" free account on Cyclic, we are limited to only 3 apps, so if you have been experimenting on Cyclic and have created 3 apps already, you must delete one (or verify your account with a credit card).  Once you have received a grade for Assignment 1, it is safe to delete this app (login to the Cyclic website, click the   (Options & configs) button on your app and click Delete app… button under "Advanced").

Testing: Sample Solution

To see a completed version of this app running, visit: https://web322-assignments-demo-2231.cyclic.app/     

Please note: This solution is visible to ALL students and professors at Seneca College.  It is your responsibility as a student at the college not to post inappropriate content / images to the shared solution.  It is meant purely as an exemplar and any misuse will not be tolerated.

Assignment Submission:
•	Before you submit, consider updating site.css to provide additional style to the pages in your app.  Black, White and Gray is boring, so why not add some cool colors and fonts (maybe something from 
Google Fonts)? This is your app for the semester, you should personalize it!
•	Next, Add the following declaration at the top of your server.js file:
/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ______________________ Student ID: ______________ Date: ________________
*
*  Online (Cyclic) Link: 
*
********************************************************************************/ 
•	Compress (.zip) your web322-app folder (with all files/folders in the it) and submit the .zip file to My.Seneca under 
Assignments -> Assignment 3
Important Note:
•	NO LATE SUBMISSIONS for assignments. Late assignment submissions will not be accepted and will receive a grade of zero (0).
•	After the end (11:59PM) of the due date, the assignment submission link on My.Seneca will no longer be available.
•	Submitted assignments must run locally, ie: start up errors causing the assignment/app to fail on startup will result in a grade of zero (0) for the assignment.
