// import React from 'react'
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./components/pages/home/Home";
import Header from "./components/header/Header";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Verify from "./components/pages/auth/Verify";
import About from "./components/pages/about/About";
import Account from "./components/pages/account/Account";
import Footer from "./components/footer/footer";
import { UserData } from "./context/UserContext";
import  Loading from "./components/loading/Loading"
import Courses from "./components/pages/courses/Courses";
import CourseDescription from "./components/pages/coursedescription/CourseDescription";
import PaymentSuccess from "./components/pages/paymentsuccess/PaymentSuccess";
import Dashbord from "./components/pages/dashbord/dashbord";
import CourseStudy from "./components/pages/coursestudy/CourseStudy";
import Lecture from "./components/pages/lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";

const App = () => {
  const {isAuth , user, loading} = UserData()

  return (
    <div>
      {loading?<Loading/> : 
      <BrowserRouter>
      <Header isAuth ={isAuth}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/account" element={isAuth?<Account user={user}/> :<Login/>} />
        <Route path="/login" element={isAuth?<Home/> :<Login/>}/>
        <Route path="/register" element={isAuth?<Home/> :<Register/>}/>
        <Route path="/verify" element={isAuth?<Home/> :<Verify/>}/>
        <Route path="/course/:id" element={isAuth? <CourseDescription/>: <Login/>}/>
        <Route path = "/payment-success/:id" element = {isAuth?<PaymentSuccess user={user}/> : <Login/>}/>
        <Route path = "/:id/dashboard" element = {isAuth?<Dashbord user={user}/> : <Login/>}/>
        <Route path = "/course/study/:id" element = {isAuth?<CourseStudy user={user}/> : <Login/>}/>
        <Route path = "/lectures/:id" element = {isAuth?<Lecture user={user}/> : <Login/>}/>
        <Route path = "/admin/dashboard" element = {isAuth?<AdminDashboard user={user}/> : <Login/>}/>
        <Route path = "/admin/course" element = {isAuth?<AdminCourses user={user}/> : <Login/>}/>
        <Route path = "/admin/users" element = {isAuth?<AdminUsers user={user}/> : <Login/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
}
    </div>
      
  )
}

export default App;
