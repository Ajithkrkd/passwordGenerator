import React from "react";

export const GeneratePassword = () => {
    
  return (
    <>
      <div className="p-4 bg-[#2480EA] " id='generate'>
        <p className="text-[#FFFF] font-semibold text-[16px] md:text-3xl text-center">
          Customize your passwords with symbols, numbers, <br /> uppercase, and
          lowercase letters.
        </p>
        <div class="flex flex-col items-center justify-center  p-2 pt-5 mt-3">
          <div class="flex flex-row justify-between bg-white w-full max-w-sm p-2 rounded">
            <p className="text-xl text-[green] font-bold">yhdl9hn==</p>
            <div className="flex flex-row gap-3">
              <p className="cursor-pointer text-2xl">
                <i class="bx bx-refresh"></i>
              </p>
              <p className="cursor-pointer text-xl">
                <i class="bx bx-copy"></i>
              </p>
            </div>
          </div>

          <div class="flex flex-col justify-between bg-white w-full max-w-sm p-2 rounded m-5 gap-5">
            <div className=" text-center border-[2px] p-1">
              <p className="text-[18px]">Customize your password</p>
            </div>
            <div className="text-center flex justify-center ">
              <ul className="">
                <li className="p-1">
                  <p>password length</p>
                </li>
                <li className="p-1">
                  <p className="text-xl ">6</p>
                </li>
                <li className="p-1">
                  <input
                    className=""
                    style={{ width: "200px" }}
                    type="range"
                  ></input>
                </li>
              </ul>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center">
              <label class="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  class="mr-2 accent-blue-500 focus:ring-blue-500"
                />
                <span class="text-center">Uppercase</span>
              </label>
              <label class="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  class="mr-2 accent-blue-500 focus:ring-blue-500"
                />
                <span class="text-center">Lowercase</span>
              </label>
              <label class="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  class="mr-2 accent-blue-500 focus:ring-blue-500"
                />
                <span class="text-center">Numbers</span>
              </label>
              <label class="flex items-center p-2 rounded-md bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  class="mr-2 accent-blue-500 focus:ring-blue-500"
                />
                <span class="text-center">Symbols</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
