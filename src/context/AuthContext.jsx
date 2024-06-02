import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user,setUser] = useState({});


  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      navigate("/");
  };

  const logOut = () =>{
    signOut(auth);
    setUser(null);
    navigate('/register');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged (auth , (currentUser)=>{
        setUser(currentUser);
        console.log("User" , currentUser)
    });
    return ()=>{
      unsubscribe();
    };
  },[])





  return (
    <AuthContext.Provider value={{ googleSignIn , logOut , user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
