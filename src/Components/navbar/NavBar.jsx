import React from 'react'

export const NavBar = () => {
  return (
    <>
    <head>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    </head>
      <div className="p-2 shadow-md">
        <ul className='
        items-center
        list-style-none flex justify-between'>
          <li>
            <img src='/logo.png' 
              style={{width:'70px'}}
            />
          </li>
          <li>
            <p className='text-2xl'>SecurePassGen</p>
          </li>
          <li>
            <p className='text-[29px]'>
            <i className='bx bx-menu'></i>
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}
