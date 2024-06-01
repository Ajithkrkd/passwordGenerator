import React, { useState } from "react";
import toast from "react-hot-toast";

export const GeneratePassword = () => {
  const [password, setPassword] = useState("password");
  const [passwordLength, setPasswordLength] = useState(6);
  const [tooltip, setTooltip] = useState("");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  function generateRandomPassword(length, options) {
    
    const defaultOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeSimilar: true, // Exclude easily confused characters (l1, IoO, etc.)
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

  return (
    <>
      <div className="p-4 bg-[#2480EA]" id="generate">
        <p className="text-[#FFFF] font-semibold text-[16px] md:text-3xl text-center mb-4">
          Customize your passwords with symbols, numbers, <br /> uppercase, and
          lowercase letters.
        </p>
        <div className="flex flex-col items-center justify-center p-2 pt-5 mt-3">
          <div className="flex md:flex-row flex-col  justify-between bg-white w-full max-w-sm p-2 rounded relative">
            <div>
            <p className="text-xl text-[green] ">{password}</p>
            </div>
            <div className="flex flex-row gap-3 ">
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
              className="btn bg-[#FFA900] p-2 dark:hover:bg-gray-900 transition ease-in-out delay-250 duration-300"
              onClick={handleGeneratePassword}
            >
              <span className="font-semibold text-[18px] text-[#FFFF]">Generate</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
