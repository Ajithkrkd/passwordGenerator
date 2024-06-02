import React, { useEffect } from "react";
import './banner.css'
import '/src/Components/generatePassword/generate.css'
export const Banner = () => {
  const handleScroll = () => {
    const generateSection = document.getElementById("generate");
    if (generateSection) {
      generateSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
     <div className="bg-[#2480EA] py-4  flex flex-col md:flex-row justify-evenly">
     <div className=" py-4 px-3 flex flex-col gap-4">
        <p className="text-[#FFFF] text-[37px] md:text-5xl font-semibold">
          Why Choose <br/> SecurePassGen?
        </p>
        <p className="text-[#FFFF]">
          Create Strong, Customized Passwords Instantly
        </p>
        <button className="btn bg-[#FFA900] p-2 dark:hover:bg-gray-900 transition ease-in-out delay-250 duration-300"
        onClick={handleScroll}
        >
          <span className="font-semibold text-[18px] text-[#FFFF] ">
            
            Create now
            
          </span>
        </button>
       
      </div>
      <div className=" px-3 py-4 flex flex-col">
       <img style={{maxWidth:400}} src='/logo.png'/>
      </div>
     </div>
    </>
  );
};
