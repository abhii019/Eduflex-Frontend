/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";

import { CourseData } from "../../../context/CourseContext";
import { server } from "../../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../../context/UserContext";
import Loading from "../../loading/Loading";

// eslint-disable-next-line react/prop-types
const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
  
    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
  
      const options = {
        key: "rzp_test_XbPXyzVhmZbJUF", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount in currency subunits
        currency: "INR",
        name: "Eduflex",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                
              },
              {
                headers: {
                  token,
                },
              }
            );
            console.log('Payment Verification Data:', {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            });
  
            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);  
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.success(error.response?.data?.message || "Payment verification Done");
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);

          }
        },
        theme: {
          color: "#8a4baf",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout process failed");
      setLoading(false);
    }
  };
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>

              <p>Lets get started with course At ₹{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="commonbtn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="commonbtn">
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
