"use client"
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='min-h-screen w-screen flex items-center'>
      <div className='w-3/12 mx-auto text-center h-48'>
        <h2 className='font-bold text-gray-700 text-4xl'>Not Found</h2>
        <p className='text-gray-500 text-2xl'>Could not find requested resource</p>
        <button className='bg-blue-500 hover:opacity-80 mt-4 text-white px-3 py-1 rounded-lg' onClick={() => router.back()}>Back</button>
      </div>
    </div>
  )
}