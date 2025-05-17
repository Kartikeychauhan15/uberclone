import React from 'react'
import { Link } from 'react-router-dom';


const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8  flex justify-between flex-col  w-full'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' className='ml-8 w-16'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-[25px] font-semibold'>Get Started with Uber</h2>
                <Link to="/login" className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start