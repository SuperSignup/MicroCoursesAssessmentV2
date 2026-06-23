/*
Overview:
This file provides the detailpage that shows more information on the selected course
Uses axios to communicate with the node api backend server
*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Courses.css'
import imageHome from '../assets/home.png';

function DetailPage() {
    const id = new URLSearchParams(location.search).get('courseId'); //Gets course id from the url
    const port = 3000;
    const backendUrl = `http://localhost:${port}/courses/${id}`;

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };

    const [course, setCourse] = useState({ 'listOfModules': [] }); //default values with listOfModules as an empty array is needed to prevent errors


    useEffect(() => {
        const fetchCourseById = async () => {
            try {
                const res = await axios.get(backendUrl);
                //console.log(res.data);
                setCourse(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourseById();
    }, []);

    //provide visual feedback to the enrolment button when clicked, no state saved between page traversals
    const [enrolled, setEnrolled] = useState(false);
    const toggleEnrolled = () => {
        setEnrolled(!enrolled);
    }

    return (
        <div className='container'>
            <h1 className='title'>Course Details</h1>
            <div>
                <img src={`./${course.imageSrc}`}></img>
                <h1>{course.title}</h1>
                <h2>Description:</h2>
                <p>{course.descLong}</p>
                <h2>Hours to Complete:</h2>
                <p>{course.hoursToComplete}</p>
                <h2>Duration:</h2>
                <p>{course.duration}</p>
                <h2>Instructor:</h2>
                <p> {course.instructor}</p>
                <h2>Category:</h2>
                <p>{course.category}</p>
                <h2>List of Modules:</h2>
                <ul>
                    {course.listOfModules.map((module, index) => (
                        <li key={index}>{module}</li>
                    ))}
                </ul>
                <button className='homepageButton' onClick={handleButtonClick}>Homepage <img className='icon' src={imageHome}></img></button>
                <button className='enrolButton' onClick={toggleEnrolled}>{enrolled === true ? 'Enrolled! 🗹' : 'Enrol ☐'}</button>
            </div>
        </div>
    );
}

export default DetailPage;