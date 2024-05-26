import Cookies from 'js-cookie';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Navbar = ({fullName, roleType}) => {
  const pathname = usePathname()
  const [showChild, setShowChild] = useState(false)
  const [popup, setPopup] = useState(false)
  
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  const handleLogout = () => {
    Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
    Swal.fire({
      title: "Success",
      text: "You have been logged out",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      window.location.reload();
    });;
  };

  return (
    <header className='grid grid-cols-3 bg-white border-black border-b w-screen'>
      <div className='col-span-1'></div>
      <div className='flex justify-center space-x-4 text-[32px]'>
        <Link href={`/task`} className={`hover:text-black/70  ${pathname === '/task' ? 'text-black/70' : ''}`}>
          Task
        </Link>
        {roleType === 1 && (
          <Link href={`/profile`}  className={`hover:text-black/70 ${pathname === '/profile' ? 'text-black/70' : ''}`}>
            Profile
          </Link>
        )}
      </div>
      <div className='flex justify-end text-4xl items-center relative'>
        <div onClick={() => setPopup(!popup)}>
          <span className='cursor-pointer mr-8 hover:text-black/70 '>
            {roleType === 0 ? 'Guest' : fullName}
          </span>
        </div>
        {popup && (
          <div className='absolute right-8 top-9'>
            <button onClick={() => handleLogout()} className='bg-red-500 rounded-md text-white p-2 shadow-lg text-sm '>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar