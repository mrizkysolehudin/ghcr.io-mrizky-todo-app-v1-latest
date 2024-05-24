"use client"
import React, { useEffect } from 'react'
import { useData } from '../layout';

const Page = () => {
  const { hooks, state } = useData()

  useEffect(() => {
    if (state.cookies?.roleType !== 1) hooks.router.back()
  }, [state.cookies?.roleType])

  return (
    <div className='min-h-[90dvh] flex items-center'>
      <div className='mx-auto'>
        <p>email: {state.userProfile?.email}</p>
        <p>fullname: {state.userProfile?.fullName}</p>
      </div>
    </div>
  )
}

export default Page