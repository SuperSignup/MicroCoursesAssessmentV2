/*
Overview:
This file provides a functional react homepage for the MicroCourses website
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';
import TestCourses from './TestCourses.json';
import imageThreeLines from '../assets/threelines.png';

function HomePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(TestCourses);
    }, []);

    const navigate = useNavigate();
    const handleButtonClick = (courseId) => {
        navigate(`/detail?courseId=${courseId}`);
    };

    return (
        <div className='container'>
            <h1 className='title'>MicroCourses Homepage</h1>
            <h1>Course Listing:</h1>
            {courses.map((course, index) => (
                <div className='courseDisplay' key={course._id}>
                    <img src={`./${course.imageSrc}`}></img>
                    <h1>{course.title}</h1>
                    <h2>Brief Description: </h2>
                    <p>{course.descShort}</p>
                    <h2>Hours to complete:</h2>
                    <p>{course.hoursToComplete}</p>
                    <button onClick={() => handleButtonClick(course._id)}>View Details <img className='icon' src={imageThreeLines}></img></button>
                </div>
            ))}
        </div>
    );
}

export default HomePage;