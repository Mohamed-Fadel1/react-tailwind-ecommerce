import React, { useContext, useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { IoMdFingerPrint } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import LoadinerLogIn from '../LoadinerLogIn/LoadinerLogIn';


const LogIn = () => {

  const navigete = useNavigate()

  // loading
  const [loading , setLoading] = useState(false)

  // import token context
  const {setToken} = useContext(TokenContext)

  // show password state
    const [show , setShow] = useState(false);

    // show password function
    const showPassword = ()=>{
        setShow(!show)
    }

    const callLogin = async (reqBody) => {
      try {
        setLoading(true)
        const { data } = await axios.post(`https://fakestoreapi.com/auth/login`, reqBody);
        
        if (data.token !== null) {
          localStorage.setItem("authToken", data.token);
          setToken(data.token)
          navigete('/shop')
        }
      } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
      }
    };
    

    const validationSchema = Yup.object({
      username: Yup.string()
        .oneOf(["mor_2314"], "Invalid username") // يقبل فقط اسم المستخدم المحدد
        .required("Username is required"),
      password: Yup.string()
        .matches(/^83r5\^_$/, "Invalid password") // يقبل فقط كلمة المرور المحددة
        .required("Password is required"),
    });
    

    const loginFormik = useFormik({
      initialValues :{
        username: "mor_2314",
        password: "83r5^_"
      } ,

      validationSchema ,

      onSubmit : callLogin
      
    })
  return (
    <>
      <section className='bg-gray-200 py-5 '>
        <div className="container flex items-center justify-around h-screen">
          <form onSubmit={loginFormik.handleSubmit} className='bg-white p-5 rounded-xl shadow-lg'>
            <h2 className='font-bold text-4xl'>Welcome Back</h2>
            <p className='text-md my-3'>Welcome back! Please enter your details.</p>
            
            {/* Email Input */}
            <div className='flex flex-col mb-5'>
              <label className='font-semibold' htmlFor="userName">Email</label>
              <div className='relative flex items-center'>
                <MdOutlineMail className='absolute left-3 text-gray-500 text-xl' />
                <input 
                  className='border lg:w-[500px] w-[300px] rounded-lg p-2 pl-10 capitalize outline-none' 
                  type="text" 
                  placeholder='Enter your userName' 
                  id ="userName"
                  name = "username"
                  value={loginFormik.values.username}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />
              </div>
              {loginFormik.errors.username && loginFormik.touched.username ? <div><p className='bg-red-500 p-2 rounded-lg text-white'> {loginFormik.errors.username} </p></div> : null}
            </div>

            {/* Password Input */}
            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor="password">Password</label>
              <div className='relative flex items-center'>
                <IoMdFingerPrint className='absolute left-3 text-gray-500 text-xl' />
                <input 
                  className='border lg:w-[500px] w-[300px] rounded-lg p-2 pl-10 capitalize outline-none' 
                  type= {`${show ? "text" : "password"}`} 
                  placeholder='Enter your password' 
                  id = "password"
                  name='password'
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />

                
                {show ? <FaEye title="Show Password" onClick={()=>{showPassword()}} className=' absolute right-2 cursor-pointer text-lg'/> : <IoMdEyeOff title="Hide Password" onClick={()=>{showPassword()}} className=' absolute right-2 cursor-pointer text-lg'/> }
              </div>
              {loginFormik.errors.password && loginFormik.touched.password ? <div><p className='bg-red-500 p-2 rounded-lg text-white'> {loginFormik.errors.password} </p></div> : null}

            </div>

                {/* remember and forger paaaword */}
            <div className='flex items-center justify-between text-sm pt-5'>
            <div className='flex gap-2 items-center'>
                <input type="checkbox" id="remember" className='w-3 h-3 accent-violet-600 cursor-pointer'  />
                <label htmlFor="remember" className='font-semibold cursor-pointer'>Remember for 30 days</label>
            </div>
                <p className='text-violet-600 cursor-pointer hover:underline'>Forget Password?</p>
            </div>

            {/* button log in */}
            <div>
            <button className="w-full text-white rounded-xl p-2 my-3 hover:opacity-90 duration-200 active:scale-95 bg-gradient-to-r from-violet-600 to-pink-500">
              {loading ? <LoadinerLogIn/> : "Sign in"}
                </button>
            </div>

            <div>
                <button className='w-full border rounded-xl p-2 my-3 active:scale-95 flex items-center justify-center gap-2 font-semibold'>   <FaGoogle/> Sign in With Google</button>
            </div>
          </form>

          <div className='w-48 hidden lg:block h-48 animate-spin bg-gradient-to-r from-violet-500 to-pink-500 rounded-full'></div>
        </div>
      </section>
    </>
  );
}

export default LogIn;
