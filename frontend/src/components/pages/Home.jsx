import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStroe.js'
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar.jsx'; 
import { Loader } from 'lucide-react';

const Home = () => {
   
    const { authUser } = useAuthStore() ; 
  return (
    <div>
      { !authUser && ( <Navigate to={'/signup'}/>)}  
      Hey! now you are on the home page 
      <Navbar/>
    </div>
  )
}

export default Home
