"use client"
import Card from '@/components/Card'
import React, { useEffect, useState } from 'react'
import { useData } from '../layout'

const Page = () => {
  const { action, state, hooks } = useData()

  useEffect(() => {
    if (state.cookies.roleType === '' || state.cookies.roleType === null || state.cookies.roleType === undefined) {
      hooks.router.push('/')
    }
  }, [state.cookies.roleType])

  return (
    <div>
      <div className='w-[580px] mx-auto mt-[12dvh] mb-20'>
        <section className='text-center'>
          <h1 className='text-5xl'>Task Management</h1>

          <form className='grid mt-3'>
            <label className='text-left'>Title</label>
            <input 
              type="text"
              name='title'
              value={state.formTask.title}    
              onChange={(e) => action.setFormTask((prev) => ({
                ...prev,
                title: e.target.value
              }))}
              className='rounded-[10px] h-[47px] px-3 border-[0.5px] border-black mb-2'
            />

            {state.modeFormTask === 'add' ? (
              <button
                type='button'
                onClick={(event) => action.handleAddTask({ event, title: state.formTask.title })}
                className='bg-[#6FCBFF] hover:opacity-80 w-[105px] h-[36px] rounded-[10px] mx-auto mt-4'
              >
                Add Task
              </button>
            ) : (
              <div className='space-x-3'>
                <button
                  type='button' 
                  onClick={() => {
                    action.setModeFormTask('add')
                    action.handleEditTask({ ...state.formTask, title: state.formTask.title, showAlert: true })
                  }}
                  className='bg-[#FFB46F] hover:opacity-80 w-[115px] h-[36px] rounded-[10px] mx-auto mt-4'
                >
                  Update Task
                </button>
                <button 
                  type='button'
                  className='bg-[#FF6F6F] hover:opacity-80 w-[105px] h-[36px] rounded-[10px] mx-auto mt-4'
                  onClick={() => {
                    action.clearFormTask()
                    action.setModeFormTask('add')
                  }}  
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </section>

        <section className='w-full mt-5'>
          <h4 className='font-bold'>Ongoing Task</h4>

          <article className='gap-2 grid mt-3'>
            {state.userOngoingTasks.length > 0 ? state.userOngoingTasks.map((item, index) => (
              <Card key={index} item={item} handleIsDone={action.handleEditTask} />
            )) : (
              <p className='text-sm text-gray-600/70 mb-2'>
                Tidak ada task yang sedang berlangsung
              </p>
            )}
          </article>
        </section>

        <section className='mt-10'>
          <h4 className='font-bold'>Completed Task</h4>

          <article className='gap-2 grid mt-3'>
            {state.userCompletedTasks.length > 0 ? state.userCompletedTasks.map((item, index) => (
              <Card key={index} item={item} handleIsDone={action.handleEditTask} />
            )) : (
              <p className='text-sm text-gray-600/70 mb-2'>
                Tidak ada task yang sudah selesai
              </p>
            )}
          </article>
        </section>
      </div>
    </div>
  )
}

export default Page