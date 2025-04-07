import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='h-screen pt-8 w-full flex justify-between flex-col bg-red-400'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" srcset="" />
        <div className='bg-white px-4 py-5'>
            <h1 className='text-3xl font-bold'>Get started with Uber</h1>
            <button className='w-full bg-black text-white py-3 rounded mt-5'>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Home
