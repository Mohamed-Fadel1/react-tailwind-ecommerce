import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner'

const LoadinerLogIn = () => {
  return (
    <div className='flex justify-center items-center'>
     <FidgetSpinner
  visible={true}
  height="25"
  width="25"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
  />
    </div>
  )
}

export default LoadinerLogIn
