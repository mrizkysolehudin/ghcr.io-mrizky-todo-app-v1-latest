import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Navbar = ({fullName, roleType}) => {
  const pathname = usePathname()
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <header className='grid grid-cols-3 bg-white border-black border-b w-screen'>
      <div className='col-span-1'></div>
      <div className='flex justify-center space-x-4 text-[32px]'>
        <Link href={`/task`} className={`hover:text-black/70  ${pathname === '/task' ? 'text-black/70' : ''}`}>
          Task
        </Link>
        <Link href={roleType === 0 ? '/task' : `/profile`}  className={`hover:text-black/70 ${pathname === '/profile' ? 'text-black/70' : ''}`}>
          Profile
        </Link>
      </div>
      <div className='flex justify-end text-4xl items-center'>
        <Link href={roleType === 0 ? '/task' : `/profile`}  className='cursor-pointer'>
          {roleType === 0 ? 'Guest' : fullName}
        </Link>
      </div>
    </header>
  )
}

export default Navbar