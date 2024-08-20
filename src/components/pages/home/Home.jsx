// import React from 'react'
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../testimonials/Testimonials";
const Home = () => {

  const navigate = useNavigate();
  return (
    <div>
    <div className="home">
      <div className="home-content"></div>
      <h1>Welcome to our E-learing Platform</h1>
      <p>Learn ,Grow, Excel</p>
      <button onClick={() => navigate("/courses")} className="commonbtn">Get Started</button>
    </div>
    <Testimonials/>
   
    </div>
  )
}

export default Home
