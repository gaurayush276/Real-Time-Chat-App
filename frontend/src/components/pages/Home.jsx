import React from 'react'
import { useAuthStore } from '../store/useAuthStroe'
import { Navigate } from 'react-router-dom';

const Home = () => {
    const { authUser } = useAuthStore() ; 
  return (
    <div>
      { !authUser && ( <Navigate to={'/login'}/>)}   
    </div>
  )
}

export default Home
