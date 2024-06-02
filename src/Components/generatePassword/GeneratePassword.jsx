import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserAuth } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export const GeneratePassword = () => {

  const {user} = UserAuth();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [passwordName , setPasswordName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordLength, setPasswordLength] = useState(6);
  const [tooltip, setTooltip] = useState("");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function generateRandomPassword(length, options) {
    
    const defaultOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeSimilar: true, 
    };
    
    if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
        toast.error("Please choose at least one option");
        return "";
      }
    const mergedOptions = Object.assign({}, defaultOptions, options);
    let charPool = "";
    if (mergedOptions.uppercase) {
      charPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (mergedOptions.lowercase) {
      charPool += "abcdefghijklmnopqrstuvwxyz";
    }
    if (mergedOptions.numbers) {
      charPool += "0123456789";
    }
    if (mergedOptions.symbols) {
      charPool += "!@#$%^&*()_+-=[]{}|;:'<>,.?/`~";
    }

    if (mergedOptions.excludeSimilar) {
      charPool = charPool.replace(/[l1IoO0]/g, "");
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charPool.charAt(Math.floor(Math.random() * charPool.length));
    }

    return password;
  }

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(passwordLength, options);
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setTooltip("Password copied to clipboard");
    setTimeout(() => setTooltip(""), 2000);
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleSavePassword = async (e)=>{
    e.preventDefault();
    console.log(user.displayName, password , passwordName)
    if( !user) {
      toast.error("Please SignIn to Save Passsword");
      return;
    }
    if( !password) {
      toast.error("Please Generate a password first !");
      return;
    }
    if( !passwordName) {
      toast.error(" Oops !! Please Type a Name !");
      return;
    }
    if(user && password && passwordName) {
      try {
        setFetching(true)
       const result =  await addDoc(collection(db,"users",user.uid,"password"),{
          passwordName:passwordName,
          password: password,
          createdAt: new Date()
        });
        console.log(result ,'result after  saved')
        toast.success("Password saved successfully ");
        setPasswordName('');
      } catch (error) {
        console.log('first')
        console.log(error)
      }
      finally{
        setFetching(true);
        handleClose();
      }
    }
  }


  return (
    <>
    {fetching && <Loader/>}
      <div className="p-4 bg-[#2480EA]" id="generate">
        <p className="text-[#FFFF] font-semibold text-[16px] md:text-3xl text-center mb-4">
          Customize your passwords with symbols, numbers, <br /> uppercase, and
          lowercase letters.
        </p>
        <div className="flex flex-col items-center justify-center p-2 pt-5 mt-3">
          <div className="flex md:flex-row flex-col  justify-between bg-white w-full max-w-sm p-2 rounded relative">
            <div>
            <p className="text-xl text-[green] ">{password? password : "your password goes here !!"}</p>
            </div>
            <div className="flex flex-row justify-end gap-3 ">
              <p
                className="cursor-pointer text-2xl"
                onClick={handleGeneratePassword}
              >
                <i className="bx bx-refresh"></i>
              </p>
              <p className="cursor-pointer text-xl" 
                onClick={handleCopyPassword}>
                <i className="bx bx-copy"></i>
              </p>
              {tooltip && (
                <div className="absolute top-[-30px] z-100 right-0 bg-gray-700 text-white text-xs rounded py-1 px-2">
                  {tooltip}
                </div>
              )}
            </div>
          </div>
          
       

          <div className="flex flex-col justify-between bg-white w-full max-w-sm p-2 rounded m-5 gap-5">
            <div className="text-center border-[2px] p-1">
              <p className="text-[18px]">Customize your password</p>
            </div>
            <div className="text-center flex justify-center">
              <ul>
                <li className="p-1">
                  <p>Password length</p>
                </li>
                <li className="p-1">
                  <p className="text-xl ">{passwordLength}</p>
                </li>
                <li className="p-1">
                  <input
                    className=""
                    style={{ width: "200px" }}
                    type="range"
                    min="6"
                    max="20"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(e.target.value)}
                  />
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center">
              <label className="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500 focus:ring-blue-500"
                  name="uppercase"
                  checked={options.uppercase}
                  onChange={handleOptionChange}
                />
                <span className="text-center">Uppercase</span>
              </label>
              <label className="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500 focus:ring-blue-500"
                  name="lowercase"
                  checked={options.lowercase}
                  onChange={handleOptionChange}
                />
                <span className="text-center">Lowercase</span>
              </label>
              <label className="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500 focus:ring-blue-500"
                  name="numbers"
                  checked={options.numbers}
                  onChange={handleOptionChange}
                />
                <span className="text-center">Numbers</span>
              </label>
              <label className="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500 focus:ring-blue-500"
                  name="symbols"
                  checked={options.symbols}
                  onChange={handleOptionChange}
                />
                <span className="text-center">Symbols</span>
              </label>
            </div>
            <button
              className="btn bg-[#2480EA] p-2 dark:hover:bg-gray-900 transition ease-in-out delay-250 duration-300"
              onClick={handleGeneratePassword}
            >
              <span className="font-semibold text-[18px] text-[#FFFF]">Generate</span>
            </button>
            <button
              className="btn bg-[#82B536] p-2 dark:hover:bg-gray-900 transition ease-in-out delay-250 duration-300"
              onClick={handleClickOpen}
            >
              <span className="font-semibold text-[18px] text-[#FFFF]">Save Password</span>
            </button>
            <button
              className="btn bg-[#2480EA] p-2 dark:hover:bg-gray-900 transition ease-in-out delay-250 duration-300"
              onClick={()=>{navigate("/profile")}}
            >
              <span className="font-semibold text-[18px] text-[#FFFF]">My Saved Password</span>
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        >
        <DialogTitle>Save password</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Do you want to save this password ?
           Enter a name for your password eg: my google password
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPasswordName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={handleSavePassword}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
};
