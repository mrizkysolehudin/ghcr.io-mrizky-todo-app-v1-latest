"use client"
import { baseUrl } from '@/helpers/baseUrl'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const clearForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
  }

  const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

  const validateForm = () => {
    if (form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '' ) {
      Swal.fire({
        title: "Warning",
        text: "Form cannot be empty.",
        icon: "info",
      });
      return false
    } else if (form.password.length < 8) {
      Swal.fire({
        title: "Warning",
        text: "Password must be more than 7 characters long.",
        icon: "info",
      });
      return false
    }
    return true
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const isValid = validateForm()
      if(!isValid) return

      const response = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...form,
          }),
      });
      const result = await response.json();

      if (response.status === 200) {
        clearForm()
        Swal.fire({
            title: "Success",
            text: result?.data?.message,
            icon: "success",
        });
        router.push('/')
      } else {
        Swal.fire({
            title: "Error",
            text: result?.data?.message,
            icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
          title: "Error",
          text: 'Terjadi kesalahan. Mohon maaf atas ketidaknyamanannya.',
          icon: "error",
      });
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <article className="border border-black bg-white w-[378px] h-fit rounded-lg text-lg">
        <div className="my-8">
          <div className="w-fit mx-auto rounded-xl overflow-hidden font-semibold text-xl">
            Register User        
          </div>

            <form onSubmit={handleRegister} className="w-[294px] mx-auto mt-5 space-y-2">
                  <div className="grid">
                    <label>First Name</label>
                    <input
                      name="firstName"
                      type="firstName"
                      onChange={handleChange}
                      value={form.firstName}
                      className="border border-black rounded-lg h-[34px] text-sm px-3" 
                    />
                  </div>
                  <div className="grid">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      type="lastName"
                      onChange={handleChange}
                      value={form.lastName}
                      className="border border-black rounded-lg h-[34px] text-sm px-3" 
                    />
                  </div>
                  <div className="grid">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={form.email}
                      className="border border-black rounded-lg h-[34px] text-sm px-3" 
                    />
                  </div>
                  <div className="grid">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={form.password}
                      className="border border-black rounded-lg h-[34px] text-sm px-3" 
                    />
                  </div>
              <div className={''}>
                <button type="submit" className="text-white bg-green-600 border border-black rounded-xl w-[114px] h-[45px] block mx-auto mt-10">
                  Register
                </button>
              </div>
            </form>
        </div>
      </article>
    </main>
  )
}

export default Page