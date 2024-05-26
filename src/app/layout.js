"use client"
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { baseUrl } from "@/helpers/baseUrl";
import Swal from "sweetalert2";
import { poppins } from "@/assets/fonts";


const DataContext = createContext();

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const userCookies = Cookies.get('user');

  const { id: userId, roleType } = userCookies ? JSON.parse(userCookies) : {};
  const [userProfile, setUserProfile] = useState({
    id: '',
    roleType: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: ''
  })
  const [userOngoingTasks, setUserOngoingTasks] = useState([])
  const [userCompletedTasks, setUserCompletedTasks] = useState([])
  const [formTask, setFormTask] = useState({
    id: '',
    title: '',
    isEdit: false
  })
  const [modeFormTask, setModeFormTask] = useState('add')

  const clearFormTask = () => {
    setFormTask({
      id: '',
      title: '',
      isEdit: false
    })
  }

  const getMyProfile = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/users?id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        setUserProfile({
          ...result?.data,
          fullName: result?.data?.firstName + ' ' + result?.data?.lastName
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMyTasks = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/tasks?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        const ongoingTasks = result?.data?.data?.filter((i) => !i.isDone).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const completedTasks = result?.data?.data?.filter((i) => i.isDone).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUserOngoingTasks(ongoingTasks)
        setUserCompletedTasks(completedTasks)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (payload) => {
    let { id, isDone, title, showAlert = false  } = payload
    try {
      if (title === '') {
        Swal.fire({
          title: "Warning",
          text: "Title cannot be empty.",
          icon: "info",
        });
        return
      }
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          dataId: "updateTask", 
          data: {id, isDone, title} 
        })
      });
      if (response.status === 200) {
        if (showAlert) {
          clearFormTask()
          Swal.fire({
            title: "Success",
            text: "The task has been successfully updated",
            icon: "success",
          });
        }
        await getMyTasks(userId)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async ({ event, title }) => {
    event.preventDefault()
    if (title === '') {
      Swal.fire({
        title: "Warning",
        text: "Form cannot be empty.",
        icon: "info",
      });
      return
    }
    try {
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          dataId: "createTask", 
          data: {
            title: title,
            isDone: false, 
            userId: userId
          } 
        })
      });
      if (response.status == 201) {
        clearFormTask()
        Swal.fire({
            title: "Success",
            text: "Task creation successful.",
            icon: "success",
        });
        await getMyTasks(userId)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/tasks?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: result?.data?.message,
          icon: "success",
        });
        await getMyTasks(userId)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      if(pathname === '/profile' || pathname === '/task') getMyProfile(userId)
      if(pathname === '/task') getMyTasks(userId)
    } 
  }, [userId, pathname]);

  return (
    <DataContext.Provider 
      value={{ 
        action: {
          setUserProfile,
          setUserOngoingTasks,
          setUserCompletedTasks,
          setFormTask,
          setModeFormTask,
          handleEditTask,
          handleAddTask,
          clearFormTask,
          deleteTask,
        },
        state: {
          userProfile,
          userOngoingTasks,
          userCompletedTasks,
          cookies: {
            userId,
            roleType,
          },
          modeFormTask,
          formTask,
        },
        hooks: {
            pathname,
            router,
        }
      }}
    >
      <html lang="en" className={`${poppins.variable} font-sans`}>
        <body className={`min-h-screen `}>
          {pathname === '/profile' || pathname === '/task' ? (
            <Navbar roleType={roleType} fullName={userProfile.fullName} />
          ) : null}
          {children}
        </body>
      </html>
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
