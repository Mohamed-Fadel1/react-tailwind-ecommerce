import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Loader from "../SideBar/Loader/Loader";

const Jewelery = () => {
  // import use state
  const [jewelery, setJewelery] = useState([]);
  const [loading , setLoading] = useState(false)

  
  // import cart context
  const {addToCart} = useContext(CartContext);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`https://fakestoreapi.com/products`);
      setJewelery(data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const filterJewelery = jewelery.filter((ele) => ele.category === "jewelery");

  
  // use effect 
  useEffect(() => {
    getAllProducts();
  }, []);

  // loading
   if (loading) return <Loader/>

  return (
    <>
      <section className="py-20">
        <div className="container">
          <h2 className="py-5 text-4xl font-bold">Jewelery :</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-6 cursor-pointer">
            {filterJewelery.map((ele) => {
              return (
                <div key={ele.id} className="relative group">
                  {/* image */}
                  <div className="border p-5 md:h-[200px] md:w-[230px] flex items-center justify-center relative overflow-hidden">
                    <img
                      className="w-1/2 m-auto"
                      src={ele.image}
                      alt={ele.title}
                    />

                    {/* add and details eye */}
                    <div className=" absolute flex flex-col space-y-2 top-2 right-[-50px] group-hover:right-2 transition-all duration-300">
                      {/* add cart */}
                      <button onClick={()=>{addToCart(ele.id , ele)}} className="bg-red-500 w-9 h-9 flex items-center justify-center text-white cursor-pointer">
                        +
                      </button>
                      {/* eye */}
                      <Link to={`details/${ele.id}`} className="bg-white w-9 shadow-[0_4px_10px_#999] h-9 flex items-center justify-center text-black cursor-pointer">
                        {" "}
                        <FaEye />{" "}
                      </Link>
                    </div>
                  </div>

                  {/* details */}
                  <div>
                    <h6 className="text-gray-600">{ele.category}</h6>
                    <p className="text-sm font-semibold py-2">{ele.title}</p>
                    <p className="text-green-600 font-bold">${ele.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jewelery;
