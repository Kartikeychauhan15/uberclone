import React from "react";
import { Link } from "react-router-dom";
// import { endRide } from "../../../Backend/services/ride.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate()
  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId: props.ride._id
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    if(response.status === 200){
      // props.setFinishRidePanel(false)
      navigate("/captain-home")
    }
  
    
  }

  return (
    <div className="">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Finish this ride
      </h3>

      <div className="flex items-center justify-between p-4 border-2 bg-yellow-300 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="harsh patel"
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        {/* <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" /> */}
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.fare}/-</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
         
            
            <button
             onClick={endRide}
              className="  flex justify-center mt-5 w-full bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </button>

            {/* <p className=" mt-10 text-xs">click on finish ride btn if you have completed the payment</p> */}
       
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
