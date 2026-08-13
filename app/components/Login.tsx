"use client"
import { useState } from "react"
import { LockFill, UnlockFill } from "react-bootstrap-icons"
import { LoginUser } from "../assets/assets"
import { useFormContext, useThemeContext } from "../assets/contexts"
import { useRouter } from 'next/navigation' 
import Link from 'next/link' // 1️⃣ استيراد Link
import SignUp from "./SignUp" // استدعي مكون Signup الخاص بك هنا

export default function Login() {
    const [type, setType] = useState<string>("password")
    const [IsLocked, setIsLocked] = useState<boolean>(true)
    const [user, setUser] = useState<LoginUser>({ phoneNumber: "", password: "" })
    const { setForm } = useFormContext()
    const { theme } = useThemeContext()
    const router = useRouter()

    const handleType = () => {
        setType(prev => prev === "password" ? "text" : "password")
        setIsLocked(prev => !prev)
    }







    const HandleLogIn = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await res.json()

            if (res.ok) {
                if (data.token) localStorage.setItem("token", data.token)
                
                if (data.role) {
                    localStorage.setItem("userRole", data.role)
                } else if (Array.isArray(data.roles) && data.roles.length > 0) {
                    localStorage.setItem("userRole", data.roles[0])
                }

                router.push('/')
            } else {
                alert(data.message || "بيانات تسجيل الدخول غير صحيحة")
            }
        } catch (err) {
            console.error("Network Error:", err)
        }
    }

    return (
        <article className={`${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl`}>
            <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>login</h3>
            
            <form onSubmit={HandleLogIn}>
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                    type="text" 
                    placeholder='phone...'
                    value={user.phoneNumber}
                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
                
                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200'
                        type={type} 
                        placeholder='password...'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    
                    <button 
                        type="button" 
                        onClick={handleType} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                        {IsLocked ? <LockFill /> : <UnlockFill />}
                    </button>
                </div>

                <button type="submit" className='p-3 text-[20px] rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900 text-white font-semibold cursor-pointer'>
                    login
                </button>

                <div className="flex justify-between items-center mt-2">
                    <p className='capitalize'>no account?</p>
                    
                    <Link 
                        href="/register" 
                        className='capitalize hover:underline text-blue-600 font-semibold'
                    >
                        sign up
                    </Link>
                </div>
            </form>
        </article>
    )
}