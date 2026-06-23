'use strict';

/*
Overview:
This files creates the express server and connects to the mongodb server.
It also handles passing api requests between both servers.
*/

const express = require('express');
const cors = require('cors');
const dbHandler = require('./dbHandler');

const app = express();
const port = process.env.PORT; //Use environment variables
const uri = process.env.DB_URI;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

//Check to make sure environment variables are all there
if ([port, uri, username, password, dbName].includes(undefined)) {
  throw new Error('Environment variables or .env file not found.');
}

//Connect to the mongodb server
const db = new dbHandler();
db.connect(uri, username, password, dbName);

//middleware
app.use(cors());
app.use(express.json());

//retrieve a list of all courses
app.get('/courses', (req, res) => {
  console.log('GET /courses');
  db.getAllCourses().then(courses => { //Can't call an async function from a non-async function, uses promises to fix this issue
    res.json(courses);
  }, () => {
    res.sendStatus(404).end();
  });
});

//retrieve detailed information about a specific course specified by :id
app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  console.log(`GET /courses/${id}`);
  db.getCourseById(id).then(course => {
    res.json(course);
  }, () => {
    res.sendStatus(404).end();
  });
});

//allows for adding new courses with an api call, use postman to activate this
app.post('/courses', (req, res) => {
  console.log('POST /courses');
  db.addCourse(req.body).then(_id => {
    res.status(201).json({
      'message': 'Course created',
      '_id': _id
    });
  }, () => {
    res.status(400).send('Course validation failed, course was not added.');
  });
});

//Starts the express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});



