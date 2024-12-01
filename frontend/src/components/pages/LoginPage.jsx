import React from 'react'
import { useAuthStore } from '../store/useAuthStroe'
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const { authUser } = useAuthStore() ; 
    return (
      <div>
        { authUser && ( <Navigate to={'/home'}/>)}
      </div>
    )
}

export default LoginPage
