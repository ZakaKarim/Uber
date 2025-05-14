import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props)
  const locations = [
    "Noor Street  Walton Road Lahore Cantt",
    "kashif Traders  Walton Road Lahore Cantt",
    "Model Town Link Road Lahore",
    "Johar town block G",
    "DHA Phase 5 DevSarch"
  ]
  return (
    <div>

      {
        locations.map(function(elem,idx){
          return  <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-1 rounded-xl border-gray-50 active:border-black p-2 m-2 items-center justify-start'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full m-2'><i className="ri-map-pin-2-line"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
        </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
