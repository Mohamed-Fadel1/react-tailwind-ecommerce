import React, { useContext } from 'react'
import { LuShoppingCart } from "react-icons/lu";
import { SideBarContext } from '../../Context/SideBarContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { TokenContext } from '../../Context/TokenContext';


const Header = () => {
      const {toggleSidebar } = useContext(SideBarContext);
      const {totalItem} = useContext(CartContext);
      const {token ,setToken} = useContext(TokenContext)

      const navigete = useNavigate()

      const logOut = ()=>{
          localStorage.removeItem("authToken");
          setToken(null);
          navigete("/login")
      }
  
  return (
    <header>
      <nav className=' fixed top-0 left-0 right-0 z-20 bg-white shadow-lg'>
        <div className="container flex justify-between items-center py-2">
          {/* logo */}
          <div>
            <Link to={''} className='text-2xl font-bold'>E-<span className='text-violet-600'>Com</span></Link>
          </div>
          {/* cart */}
         <div className='flex items-center gap-5'>
         <div className='text-2xl cursor-pointer relative'>
            <button onClick={()=>{toggleSidebar()}}><LuShoppingCart/> <p className='bg-red-600 text-sm rounded-full w-5 h-5 text-white absolute -top-1 -right-2 flex justify-center items-center'> {totalItem} </p></button>

          </div>
          {token?<button onClick={logOut}  className='px-5 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 duration-150 active:scale-95'>Log out</button>: ""}
         </div>
        
        </div>
      </nav>
    </header>
  )
}

export default Header
