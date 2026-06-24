# MicroCourses Component 2

## Installation:
```
npm install
```
Place the 'server.env' file in the 'Component 2' folder

## Get Started:
```
node --env-file=server.env server.js
```
Server available at http://localhost:3000

## API Endpoints:
- GET /courses
Retrieve a list of courses.

- GET courses/:id/
Retrieve detailed information about a specific course.

- POST /courses/
Add a new course.

## Courses Data Model:
- _id: ObjectId
Unique identifier for each course, automatically generated.

- title: String
The name of the course.

- descShort: String
A short description of the course.

- descLong: String
A long description of the course.

- hoursToComplete: Number, minimum 0
How long (in hours) it takes to complete the course.

- duration: String
A statement on how long the course will take to complete, can be in hours, days, weeks, etc.

- instructor: String
The instructor in charge of teaching the course.

- category: String
A loose categorisation of what area of interest the course falls under.

- listOfModules: Array
A list of modules/lessons that are included in the course.