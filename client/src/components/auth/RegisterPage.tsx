import React, { useState } from 'react'
import Bg from '../../assets/bg/bg.jpg'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'flowbite-react';

const API_BASE_URL = import.meta.env.VITE_URL_API

const RegisterPage = () => {

   const [username, setUSername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setLoading] = useState(false);

   const handleClick = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
         await axios.post(`${API_BASE_URL}/api/users`, { username, email, password });
         window.location.href = "/login"
      } catch (error) {
         toast.error('Email already exist', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            theme: "light",
         });
         setLoading(false);
      }
   }

   return (
      <>
         <ToastContainer />
         <div className="w-full h-[100vh] flex justify-center items-center text-sm bg-[#686279]">
            <div className="p-3 rounded-[7px] shadow-md flex items-center gap-2 bg-[#2C2638]">
               <div className="left relative hidden md:block">
                  <img src={Bg} className='w-[345px] h-[470px] object-cover rounded-[7px]' />
                  <div className='absolute bottom-[25px] w-full text-center text-[18px] text-white'>
                     <p>Capturing Moments,</p>
                     <p>Creating Memories</p>
                  </div>
               </div>
               <div className="right p-3 w-[345px] text-white">
                  <h1 className='text-3xl font-medium'>Create an account</h1>
                  <p className='text-[11px] font-light mt-2'>Already have an account? <a href="/login" className='underline'>LogIn</a></p>
                  <form className='flex flex-col gap-3 mt-7'>
                     <input type="text" className='bg-[#3a374c] w-full text-white text-sm px-2 rounded-[5px]' placeholder='Username' value={username} onChange={(e) => setUSername(e.target.value)} />
                     <input type="email" className='bg-[#3a374c] w-full text-white text-sm px-2 rounded-[5px]' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                     <input type="password" className='bg-[#3a374c] w-full text-white text-sm px-2 rounded-[5px]' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                     <div className='flex items-center gap-2 text-[12px]'>
                        <input type="checkbox" className='outline-none' />
                        <p>I agree to the Terms & Conditions</p>
                     </div>
                     <button className='bg-[#6d54b5] text-[13px] py-2 rounded-[5px] mt-5' onClick={handleClick} disabled={isLoading}>{isLoading ? <Spinner aria-label="Small spinner example" size="sm" /> : "Create account"}</button>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default RegisterPage