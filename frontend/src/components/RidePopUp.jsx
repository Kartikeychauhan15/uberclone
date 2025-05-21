import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={()=>{
            props.setRidePopupPanel(false)
        }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">New ride available! </h3>

        <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
            <div className="flex items-center gap-3">
                <img className='h-12 w-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="harsh patel" />
                <h2 className='text-lg font-medium'>Harsh Patel</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
       <div className="flex gap-2 justify-between items-center flex-col">
         {/* <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png" alt="" /> */}
         <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className=' text-lg ri-map-pin-user-fill'></i>
                <div className="">
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab , Bhopal</p>
                </div>
            </div>
             <div className="flex items-center gap-5 p-3 border-b-2">
                <i className=' text-lg ri-map-pin-2-fill'></i>
                <div >
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab , Bhopal</p>
                </div>
             </div>
             <div className="flex items-center gap-5 p-3 ">
                <i className=' text-lg ri-currency-line'></i>
                <div >
                    <h3 className='text-lg font-medium'>193/-</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
             </div>
       </div>
       
    <div className="mt-5 w-full flex items-center justify-between">
             <button onClick={()=>{
                props.setRidePopupPanel(false)
                
             }} className=' mt-1  bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>

                <button onClick={()=>{
            props.setConfirmRidePopupPanel(true)
        }} className='   bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
    </div>
       </div>
    </div>
  )
}

export default RidePopUp