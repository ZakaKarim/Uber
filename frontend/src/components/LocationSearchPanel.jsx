import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  //console.log(props)
   const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        //  setVehiclePanel(true)
        //  setPanelOpen(false)
    }
  // const locations = [
  //   "Noor Street  Walton Road Lahore Cantt",
  //   "kashif Traders  Walton Road Lahore Cantt",
  //   "Model Town Link Road Lahore",
  //   "Johar town block G",
  //   "DHA Phase 5 DevSarch"
  // ]
  return (
     <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    // <div>
    //   {/* {
    //     locations.map(function(elem,idx){
    //       return  <div key={idx} onClick={()=>{
    //         props.setVehiclePanel(true)
    //         props.setPanelOpen(false)
    //       }} className='flex gap-4 border-1 rounded-xl border-gray-50 active:border-black p-2 m-2 items-center justify-start'>
    //     <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full m-2'><i className="ri-map-pin-2-line"></i></h2>
    //     <h4 className='font-medium'>{elem}</h4>
    //     </div>
    //     })
    //   } */}
    // </div>
  )
}

export default LocationSearchPanel
