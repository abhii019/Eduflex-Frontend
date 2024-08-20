// import React from 'react'
import "./courses.css"
import { CourseData } from "../../../context/CourseContext";
import CourseCard from "../../coursecard/CourseCard";
const Courses = () => {

  const {courses} = CourseData();
  console.log(courses);
  return (
 <div className="courses">
  <h1> Available Courses</h1>

 <div className="course-container">
   {
    courses && courses.length>0 ? (courses.map((e)=>
      <CourseCard key={e._id} course={e}/>)
  ):(
    <p>No courses Yet</p>
  )}
 </div>
 </div>
  
  )
}

export default Courses;
