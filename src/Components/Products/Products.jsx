import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'; 
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loader from '../SideBar/Loader/Loader';

const Products = () => {

  // import cart context
  const {addToCart} = useContext(CartContext)

    // import use state
    const [product , setProduct] = useState([])
    const [loading , setLoading] = useState(false)

    // function get all products
    const getProducts = async ()=>{
      try {
        setLoading(true)
        const {data} = await axios.get(`https://fakestoreapi.com/products`)

        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
        
    }

    const filteredProducts = product.filter(
        (ele) => ele.category === "men's clothing" || ele.category === "women's clothing"
      );


      // use effect
    useEffect(()=>{
        getProducts()
    } , [])

    // laoding
    if (loading) return <Loader/>

  return (
    <section className='py-32'>
      <div className="container">
        <h2 className='py-4 text-4xl font-bold'>Cloth's :</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 items-stretch gap-6">
  {filteredProducts.map((ele) => {
    return (
      <div key={ele.id} className="cursor-pointer group relative">
      <div className="m-auto border p-5 md:h-[300px] flex justify-center items-center relative overflow-hidden">
      
        <img className="w-1/2 lg:w-full group-hover:scale-110 duration-200 " src={ele.image} alt={ele.title} />
        
      
        <div className="flex flex-col space-y-2 absolute top-2 right-[-50px] transition-all duration-300 group-hover:right-2">
        
          <div onClick={()=>{addToCart(ele.id ,ele)}} className="bg-red-500 w-9 h-9 text-white cursor-pointer flex justify-center items-center">
            +
          </div>
    
          <Link to={`details/${ele.id}`} className="bg-white w-9 h-9 shadow-[0_4px_10px_#999] cursor-pointer flex justify-center items-center">
            <FaEye/>
          </Link>
        </div>
      </div>
    
      
      <div>
        <p className="text-gray-600">{ele.category}</p>
        <p className="font-semibold py-1 text-sm">{ele.title}</p>
        <span className="font-bold text-green-600">${ele.price}</span>
      </div>
    </div>
    
    );
  })}
</div>

      </div>
    </section>
  )
}

export default Products
