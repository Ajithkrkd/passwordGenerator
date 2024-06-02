import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Male from "../../assets/maleAvatar.svg";
import SideBar from "../SideBar/SideBar";
export const NavBar = () => {
  const { user, logOut } = UserAuth();
  const [toggle, setToggle] = useState(false);
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <div className="p-2 shadow-md">
       
        <ul
          className="
        items-center
        list-style-none flex justify-between"
        >
          <li className="flex items-center">
          <p
          className=" md:hidden w-[28px] h-[28px] object-contain  justify-center flex px-4"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <i className="bx bx-x text-[38px]" />
          ) : (
            <i className="bx bx-menu text-[38px]" />
          )}
        </p>
        
            <Link to={"/"}>
              <img src="/logo.png" style={{ width: "70px" }} />
            </Link>
          
          </li>
          <li>
            <Link to={"/"}>
              <p className="text-[16px] sm:text-2xl font-semibold">
                SecurePassGen
              </p>
            </Link>
          </li>
          <li className="md:flex hidden">
            <div className=" text-[16px] cursor-pointer flex items-center gap-2">
              <Link to={user?.displayName ? "/profile" : "/register"}>
                <p>{user?.displayName ? user.displayName : ""}</p>
              </Link>
              <Link to={"/profile"}>
                <p>
                  {user?.photoURL && (
                    <img
                      style={{ width: "50px", borderRadius: 50 }}
                      src={user?.photoURL ? user.photoURL : Male}
                    />
                  )}
                </p>
              </Link>
              <p
                onClick={handleSignOut}
                className={`text-[16px] cursor-pointer ${
                  user ? "text-[red]" : "text-[green]"
                }`}
              >
                {user ? "logout" : "Login"}
              </p>
            </div>
          </li>
          <li className="sm:hidden">
          <Link to={"/profile"}>
                <p>
                  {user?.photoURL && (
                    <img
                      style={{ width: "50px", borderRadius: 50 }}
                      src={user?.photoURL ? user.photoURL : Male}
                    />
                  )}
                </p>
              </Link>
          </li>
        </ul>
      </div>
      <SideBar isOpen={toggle} setOpen={setToggle} />
    </>
  );
};
