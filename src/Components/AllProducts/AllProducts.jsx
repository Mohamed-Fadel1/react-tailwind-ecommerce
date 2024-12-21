import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Loader from '../SideBar/Loader/Loader';

const AllProducts = () => {
  const {addToCart} = useContext(CartContext)
  const [products , setProducts] = useState([]);
  const [filtredProducts , setFiltredProducts] = useState([]);
  const [active , setActive] = useState("all");
      const [loading , setLoading] = useState(false)

  const getAllPrpducts =async ()=>{
   try {
    setLoading(true)
    const {data} = await axios.get(`https://fakestoreapi.com/products`)
    setProducts(data)
    setFiltredProducts(data)
    setLoading(false)
   } catch (error) {
    console.error(error)
   }
  }

  useEffect(()=>{
    getAllPrpducts()
  },[])

  const filterProducts = (category)=>{
    if (category === "all") {
      setFiltredProducts(products)
    } else {
      const filtred = products.filter((ele)=>ele.category === category);
      setFiltredProducts(filtred)
    }
    
  }

  if (loading) return <Loader/>

  return (

    <>
    <section className='py-32'>
      <div className="container">
        {/* buttons  */}

        <div className='flex gap-4 flex-wrap justify-center items-center py-20'>
  <button
    onClick={() => { filterProducts("all"); setActive("all"); }}
    className={`px-8 py-2 border shadow-md border-black active:scale-95 rounded-lg ${active === "all" ? "bg-green-500 text-white border-0" : ""}`}
  >
    All
  </button>
  <button
    onClick={() => { filterProducts("men's clothing"); setActive("men's clothing"); }}
    className={`px-5 py-2 border shadow-md border-black active:scale-95 rounded-lg ${active === "men's clothing" ? "bg-green-500 text-white border-0" : ""}`}
  >
    Men's Clothing
  </button>
  <button
    onClick={() => { filterProducts("women's clothing"); setActive("women's clothing"); }}
    className={`px-5 py-2 border shadow-md border-black active:scale-95 rounded-lg ${active === "women's clothing" ? "bg-green-500 text-white border-0" : ""}`}
  >
    Women's Clothing
  </button>
  <button
    onClick={() => { filterProducts("jewelery"); setActive("jewelery"); }}
    className={`px-5 py-2 border shadow-md border-black active:scale-95 rounded-lg ${active === "jewelery" ? "bg-green-500 text-white border-0" : ""}`}
  >
    Jewelery
  </button>
  <button
    onClick={() => { filterProducts("electronics"); setActive("electronics"); }}
    className={`px-5 py-2 border shadow-md border-black active:scale-95 rounded-lg ${active === "electronics" ? "bg-green-500 text-white border-0" : ""}`}
  >
    Electronic
  </button>
</div>


        {/* products */}
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {filtredProducts.map((ele)=>{
            return <div key={ele.id} className='cursor-pointer group'>
              {/* image section */}
              <div className='bg-white p-4 rounded border relative overflow-hidden'>
                <img className=' w-full   h-40 object-contain mb-4 group-hover:scale-110 duration-200 ' src= {ele.image} alt= {ele.title} />

                <div className="flex flex-col space-y-2 absolute top-2 right-[-50px] transition-all duration-300 group-hover:right-2">
        
        <div onClick={()=>{addToCart(ele.id ,ele)}} className="bg-red-500 w-9 h-9 text-white cursor-pointer flex justify-center items-center">
          +
        </div>
  
        <Link to={`/details/${ele.id}`} className="bg-white w-9 h-9 shadow-[0_4px_10px_#999] cursor-pointer flex justify-center items-center">
          <FaEye/>
        </Link>
      </div>
              </div>

              {/* details section */}
              <div>
        <p className="text-gray-600">{ele.category}</p>
        <p className="font-semibold py-1 text-sm">{ele.title}</p>
        <span className="font-bold text-green-600">${ele.price}</span>
      </div>
            </div>
          })}
        </div>

      </div>
    </section>
    </>
  );
}

export default AllProducts
