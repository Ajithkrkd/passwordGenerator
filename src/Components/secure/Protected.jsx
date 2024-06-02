import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
const Protected = ({children}) => {
    const {user} = UserAuth();
        if(user == null){
           return <Navigate to={'/register'}/>
        }
  return children;
  
}

export default Protected