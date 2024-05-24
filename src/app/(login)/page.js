'use client'
import { baseUrl } from "@/helpers/baseUrl";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();
  const [tabs, setTabs] = useState('user')
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const clearForm = () => {
    setForm({
      email: '',
      password: ''
    })
  }

  const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: form,
            dataId: tabs === 'guest' ? 'guest' : 'user'
          }),
      });

      const result = await response.json();

      clearForm()
      if (response.status === 200) {
          Cookies.set('user', JSON.stringify(result?.data?.user));
          Swal.fire({
              title: "Success",
              text: result?.data?.message,
              icon: "success",
          });
          router.push('/task')
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
      <article className="border border-black bg-white w-[378px] h-[369px] rounded-lg text-lg">
        <div className="my-8">
          <div className="border border-black w-[206px] mx-auto divide-x divide-black rounded-xl overflow-hidden">
            <button 
              onClick={() => setTabs('user')}
              className={`w-1/2 ${tabs === 'user' ? 'bg-[#6FCBFF]' : ''}`}>
              User
            </button>
            <button 
              onClick={() => setTabs('guest')}
              className={`w-1/2 ${tabs === 'guest' ? 'bg-[#6FCBFF]' : ''}`}>
              Guest
            </button>
          </div>

            <form onSubmit={handleLogin} className="w-[294px] mx-auto mt-9">
              {tabs === 'user' && (
                <>
                  <div className="grid">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={form.email}
                      className="border border-black rounded-lg h-[45px] px-3" 
                    />
                  </div>
                  <div className="grid">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={form.password}
                      className="border border-black rounded-lg h-[45px] px-3" 
                    />
                  </div>
                </>
              )}

              <div className={`${tabs === 'guest' ? 'mt-24' : ''}`}>
                <button type="submit" className="text-white bg-green-600 border border-black rounded-xl w-[84px] h-[45px] block mx-auto mt-10">
                  Login
                </button>
              </div>
            </form>
        </div>
      </article>
    </main>
  );
}
