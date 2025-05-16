import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {

     const [email, setEmail] = useState("");
        const [password, setPassword] = useState("")
        const [firstname, setFirstname] = useState("")
        const [lastname, setLastname] = useState("")
        const [userData, setUserData] = useState({})
    
        
        const submitHandler = (e) => {
            // Handle login logic here
            e.preventDefault(); //taaki web load ho to input uska chala na jaaye
            setUserData({
                fullName:{
                    firstName:firstName,
                    lastName:lastName
                },
                password: password,
                email: email,
            })
            // console.log(userData);
            setEmail("");
            setFirstname("");
            setLastname("");
            setPassword("");
            // You can also send the data to your backend API for authentication
        }
    

  return (
    <div className="py-5 px-5  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png" alt="Uber Logo"
          className="mb-10 w-16"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full font-medium mb-2">What's our Captain name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="first name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="last name"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              required
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            classNam  e="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <button className="bg-[#111] mb-3 rounded px-4 py-2  w-full text-white placeholder:text-semibold">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have a Account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight ">
          By proceeding , you consent to get calls , WhatsApp or SMS messages ,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
