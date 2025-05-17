import React, { useContext, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";



const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();

    const {user , setUser} = useContext(UserDataContext);

 




    const submitHandler = async (e) => {
        // Handle login logic here
        e.preventDefault(); //taaki web load ho to input uska chala na jaaye
        const newUser = {
            fullname:{
                firstname:firstName,
                lastname:lastName
            }, 
            email: email,
            password: password,
          }

           const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
          if(!response){
            console.log("Error in signup");}

          if(response.status === 201){
            const data = response.data
            setUser(data.user)
            localStorage.setItem("token", data.token)
            navigate("/home")
          }

        // setUserData({
        //     fullName:{
        //         firstName:firstName,
        //         lastName:lastName
        //     },
        //     password: password,
        //     email: email,
        // })
        // console.log(userData);
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        // You can also send the data to your backend API for authentication
    }


  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="mb-10 w-16"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
              required
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e)=>{setLastName(e.target.value)}}
              required
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            required
          />
          <button className="bg-[#111] mb-3 rounded px-4 py-2  w-full text-white placeholder:text-semibold">
            Create account
          </button>
        </form>
        <p className="text-center">
          Already have a Account?{" "}
          <Link to="/login" className="text-blue-600">
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

export default UserSignup;
