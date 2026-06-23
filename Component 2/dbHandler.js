'use strict';

/*
Overview:
This file manages and encapsulates the mongoose connection
*/

const dns = require('dns');
const mongoose = require('mongoose');

class dbHandler {
    constructor() { }

    async connect(uri, username, password, dbName) {
        const options = {
            'user': username,
            'pass': password,
            'dbName': dbName
        }
        try {
            dns.setServers(['8.8.4.4', '8.8.8.8']) //Prevents connection error when connecting to mongodb, uses google dns
            console.log('Connecting to mongodb');
            await mongoose.connect(uri, options);
            console.log('Connected to mongodb successfully');

            this.CourseSchema = new mongoose.Schema({
                "title": String,
                "imageSrc": String,
                "descShort": String,
                "descLong": String,
                "hoursToComplete": { type: Number, min: 0 },
                "duration": String,
                "instructor": String,
                "category": String,
                "listOfModules": Array
            });

            this.Course = mongoose.model('Course', this.CourseSchema);
        } catch (err) {
            console.error(err);
        }
    }

    //return promise, gets an array of all courses, doesn't grab certain values from course documents
    async getAllCourses() {
        try {
            const allCourses = await this.Course.find({}, { //use projection to grab less data
                '_id': 1,
                'descLong': 0,
                'duration': 0,
                'instructor': 0,
                'category': 0,
                'listOfModules': 0
            });
            return allCourses;
        } catch (err) {
            reject();
        }
    }

    //return promise, gets a course by its corresponding id
    async getCourseById(id) {
        try {
            const course = await this.Course.findById(id);
            return course;
        } catch (err) {
            reject();
        }
    }

    //return promise, verifies and adds a new course to courses in the database
    async addCourse(newCourseJSON) {
        try {
            const newCourse = new this.Course(newCourseJSON);
            await newCourse.save(); //Validation on newCourseJSON is automatically run when saving
            return newCourse._id;
        } catch (err) {
            reject();
        }

    }
}

module.exports = dbHandler;