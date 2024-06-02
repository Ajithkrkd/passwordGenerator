import React from "react";
import "../SideBar/SideBarScript";
import "../SideBar/SideBar.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function SideBar({ isOpen, setOpen }) {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setOpen(false);
      navigate('/register');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
      <div
        className={`sidebar ${isOpen ? "open" : "hidden"}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <ul className="nav-list">
          {user ? (
            <>
              <li className="flex items-center p-4">
                <div className="ml-4">
                <img
                  src={user.photoURL || "/logo.png"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                  <p className="text-white">{user?.displayName || "Name"}</p>
                  <p className="text-gray-400">{user?.email || "email@example.com"}</p>
                </div>
              </li>
              <li className="pl-3">
                <a
                  onClick={() => {
                    setOpen(false);
                    navigate('/');
                  }}
                >
                  <i className="bx bx-home btnx"></i>
                  <span className="link_name">Home</span>
                </a>
                <span className="tooltip">Home</span>
              </li >
              <li className="pl-3">
                <a
                  onClick={() => {
                    setOpen(false);
                    navigate('/profile');
                  }}
                >
                  <i className="bx bx-user btnx"></i>
                  <span className="link_name">Profile</span>
                </a>
                <span className="tooltip">Profile</span>
              </li >
              <li className="pl-3">
                <a onClick={handleSignOut}>
                  <i className="bx bx-log-out"></i>
                  <span className="link_name">Logout</span>
                </a>
                <span className="tooltip">Logout</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  onClick={() => {
                    setOpen(false);
                    navigate('/register');
                  }}
                >
                  <i className="bx bxs-registered"></i>
                  <span className="link_name">Sign Up</span>
                </a>
                <span className="tooltip">Sign Up</span>
              </li>
              <li>
                <a
                  onClick={() => {
                    setOpen(false);
                    navigate('/register');
                  }}
                >
                  <i className="bx bx-log-in"></i>
                  <span className="link_name">Login</span>
                </a>
                <span className="tooltip">Login</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
