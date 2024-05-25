import { formatDate } from '@/helpers/formatDate'
import React from 'react'
import { Pencil, CircleX, Circle, CircleCheck } from 'lucide-react';
import { useData } from '@/app/layout';

const Card = ({item, handleIsDone}) => {
  const { state, action } = useData()

  return (
    <div className='bg-[#D0D0D0] rounded-[10px]'>
      <div className='flex justify-between items-center px-3 pb-2 pt-3'>
        <div>
          <p className='flex items-center'>
            <span className={item?.isDone ? 'line-through' : ''}>{item?.title}</span> 
            <Pencil
              className='ml-1 w-[16px] h-[16px] cursor-pointer hover:opacity-70 rounded-sm hover:text-blue-500'
              onClick={() => {
                action.setModeFormTask('edit')
                action.setFormTask((prev) => ({
                  ...prev,
                  title: item?.title,
                  id: item.id,
                  isDone: item.isDone
                }))
              }} 
            />
          </p>
          <p className='text-xs'>{formatDate({dateTime: item.createdAt})}</p>
        </div>

        <div className='flex gap-1'>
          <CircleX 
            onClick={() => action.deleteTask(item.id)}
            className='w-[20px] cursor-pointer hover:opacity-70 hover:text-red-600 rounded-full' 
          />
          {item?.isDone ? (
            <CircleCheck 
              className='w-[20px] cursor-pointer hover:opacity-70 hover:text-green-700 rounded-full' 
              onClick={() => handleIsDone({ 
                ...item, 
                isDone: !item?.isDone 
              })}   
            />
          ) : (
            <button
              id='icon-circle'
              className='rounded-full bg-white border-2 border-black w-[19px] h-[19px] mt-0.5 hover:opacity-70 hover:bg-green-400 '
              onClick={() => handleIsDone({ 
                ...item, 
                isDone: !item?.isDone
              })}>
                {/* circle */}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card