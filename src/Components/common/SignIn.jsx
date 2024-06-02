import React from 'react'
import '../banner/banner.css'
import { UserAuth } from '../../context/AuthContext'
const SignIn = () => {
  
  const {googleSignIn} = UserAuth()
  
    const handleGoogleSignIn = async()=>{
        try{
            await googleSignIn();
        }catch(error){

        }
    }
  
  
    return (
    <>
        <button onClick={handleGoogleSignIn} type="button" className="login-with-google-btn m-5" >
          Sign in with Google
        </button>
    </>
  )
}

export default SignIn