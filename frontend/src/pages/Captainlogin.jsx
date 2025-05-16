import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [captainData, setCaptainData] = useState()


    const submitHandler = (e) => {
        // Handle login logic here
        e.preventDefault(); //taaki web load ho to input uska chala na jaaye
        setCaptainData({
            email: email,
            password: password,
        });
        // console.log(userData);
        // You can also send the data to your backend API for authentication
       setEmail("");
       setPassword("");
    }

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png" alt="Uber Logo"
          className="mb-2 w-20"
        />

        <form onSubmit={(e)=>{submitHandler(e)}}>
          <h3 className="text-lg font-medium mb-2">Whats your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            required
          />
          <button className="bg-[#111] mb-3 rounded px-4 py-2  w-full text-white placeholder:text-semibold">
            Login
          </button>
        </form>
        <p className="text-center ">
          Join fleet? 
            <Link to="/captain-signup" className="text-blue-600 text-bold">
              Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link to="/login" className="bg-[#d5622d] flex items-center justify-center mb-5 rounded px-4 py-2  w-full text-white placeholder:text-semibold">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
