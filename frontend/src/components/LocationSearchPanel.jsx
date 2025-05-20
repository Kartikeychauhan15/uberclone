import React from 'react'


const LocationSearchPanel = (props) => {

    // console.log(props);
    // sample array for location
    const locations = [
        "22B, Near Kapoor's cafe , Shreyians coding school ,Bhopal",
        "211B, Near Adani's cafe , Shreyians coding school ,Bhopal",
        "24A, Near Malhotra's cafe , Shreyians coding school ,Bhopal",
        "21C, Near Sharma's cafe , Shreyians coding school ,Bhopal",
    ]

  return (
    <div>

        {/* this is just a sample data */}
        {
            locations.map(function(elem,idx){
               return   <div key={idx} onClick={()=>{
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
               }} className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill "></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
            })
        }

       
    </div>
  )
}

export default LocationSearchPanel