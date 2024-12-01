import React from 'react'

const ProfilePage = () => {
    const { authUser } = useAuthStore() ; 
    return (
      <div>
        { !authUser && ( <Navigate to={'/login'}/>)}
      </div>
    )
}

export default ProfilePage
