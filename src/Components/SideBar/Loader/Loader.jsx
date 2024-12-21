import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
      
      <div className='flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 h-screen bg-gray-200'>
      <ColorRing
        visible={true}
        height={80}
        width={80}
        ariaLabel="color-ring-loading"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <p className='text-3xl font-bold'>E-<span className='text-sky-600'>COM</span> </p>
    </div>
    </>
  )
}

export default Loader
