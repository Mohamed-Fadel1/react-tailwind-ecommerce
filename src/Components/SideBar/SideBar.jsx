import React, { useContext } from 'react';
import { SideBarContext } from '../../Context/SideBarContext';
import { CartContext } from '../../Context/CartContext';
import { FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { LuTrash2 } from "react-icons/lu";
import { Link } from 'react-router-dom';




const SideBar = () => {
  // import cart context
  const { cart ,removeToCart,clearAllCart,increaseAmount,decreaseAmount } = useContext(CartContext);

  // import side bar context
  const { isOpen , setIsOpen } = useContext(SideBarContext);


  // calc total price 

  const totalPrice = cart.reduce((acc , ele)=>acc + (ele.price*ele.amount),0)



  return (
    <>
      <div
        className={`bg-white md:w-[300px] w-full h-full z-20 fixed right-0 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}

       <div className='flex items-center justify-between border-b'>
       <p className="uppercase text-sm font-bold p-4">
          Shopping Bag ({cart.length})
        </p>
        <button onClick={()=>{setIsOpen(false)}} className='pe-3'><FaArrowRight/></button>
       </div>


       <div className='flex items-center justify-between py-2 '>
          {/* total all price */}
          <div className='ms-3'>
            <p className='text-sm font-bold uppercase'> Total:$ {totalPrice.toFixed(2)}</p>
          </div>
          {/* clear all cart */}
          <div className='bg-red-500 w-6 h-6 p-3 me-3 text-white text-xl flex justify-center items-center'>
            <button onClick={()=>{clearAllCart()}} className='active:scale-90'>
              <LuTrash2/>
            </button>
          </div>
        </div>
        {/* Cart Items */}
        <div
          className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)] "
         
        >
          {cart.map((ele) => {
            return (
              <div key={ele.id} className="border-b py-2">
               
               <div className='flex items-center gap-4 pb-2'>
                 {/* img */}
                
                <div>
                  <img
                    className="max-w-[50px] max-h-[50px] "
                    src={ele.image}
                    alt={ele.title}
                  />
                </div>

                {/* title and close */}
                
                <div className='flex items-center justify-between flex-1 gap-3'>
                  <Link to={`/details/${ele.id}`} className='text-[12px] font-semibold hover:underline'>{ele.title}</Link>
                  
                  <button onClick={()=>{removeToCart(ele.id)}} className='cursor-pointer text-red-500 font-bold'> <IoMdClose/> </button>
                </div>

               </div>

               {/*add and minus  */}
                
               <div className='flex gap-x-2 items-center justify-between '>
               <div className='  border flex gap-4 px-1 shadow-md'>
               <button onClick={()=>{decreaseAmount(ele.id)}} className='text-red-500 font-bold active:scale-90'><HiMiniMinusSmall/></button>
                  <span className='font-semibold'> {ele.amount} </span>
                  <button onClick={()=>{increaseAmount(ele.id)}} className='text-green-500 font-bold active:scale-90'><HiOutlinePlusSm/></button>
               </div>

               {/* price */}

                <div className=''>
                  <p className='text-sm text-gray-600'> ${ele.price} </p>
                </div>

                {/* total price */}

                <div className=''>
                  <p className='text-sm font-bold'> ${(ele.price*ele.amount).toFixed(2)} </p>
                </div>
                  </div>

              </div>
              
            );
          })}
          
        </div>

      
      </div>
    </>
  );
};

export default SideBar;

