import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import Loader from '../SideBar/Loader/Loader';

const ProductDetails = () => {
    // get product's id
    const {id} = useParams();



    // import cart context
    const {addToCart} = useContext(CartContext);

    // use state
    const [details , setDetails] = useState();
    const [loading , setLoading] = useState(false)
    // function get products details
    const getDetailsProduct = async ()=>{
        try {
          setLoading(true)
            const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`)
            setDetails(data)
            setLoading(false)
            
        } catch (error) {
            console.error(error)
        }
    }

 

    useEffect(()=>{
        getDetailsProduct()
    },[id])

   
    if (loading) return <Loader/>
   
    
  return (
    <section>
      <div className='container'>
        <div className='flex flex-col lg:flex-row justify-center items-center h-screen gap-10 lg:ms-20'>
            {/* image */}
            <div>
                <img className=' w-[150px] lg:w-[250px] m-auto md:m-0' src= {details?.image} alt= {details?.title} />
            </div>
            {/* details */}
            <div className='lg:w-1/2'>
                <h5 className='font-semibold text-2xl'> {details?.title} </h5>
                <p className='text-red-500 font-bold text-xl py-4'>$ {details?.price}</p>
                <p className='text-sm text-gray-600 font-semibold'>{details?.description}</p>
                <button 
  onClick={() => addToCart(details?.id, details)} 
  className='capitalize bg-black text-white px-5 py-2 rounded-lg mt-6 active:scale-95'>
  add to cart
</button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
