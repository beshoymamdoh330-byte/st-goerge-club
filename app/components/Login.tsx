"use client"
import { useState } from "react"
import { Icon, LockFill , UnlockFill } from "react-bootstrap-icons"
import { LoginUser } from "../assets/assets"
import { useFormContext, useThemeContext } from "../assets/contexts"
import { useRouter } from 'next/navigation' 

export default function Login() {
    const [type , setType] = useState<string>("password")
    const [Icon , setIcon] = useState<Icon>(LockFill)
    const [user , setUser] = useState<LoginUser>({ phoneNumber:"" , password:""})
    const {setForm} = useFormContext()
    const {theme} = useThemeContext()
    const handleType = ()=>{
        if(type === "text"){
            setType("password") 
            setIcon(LockFill)
        }
        else{
            setType("text") 
            setIcon(UnlockFill)
        }
    }
// لاستخدام التوجيه في Next.js App Router

// داخل الكومبوننت:
const router = useRouter()

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

        // 1. التأكد من أن السيرفر أرجع استجابة ناجحة (Status Code 200-299)
        if (res.ok) {
            console.log("Login Success:", data)

            // 2. حفظ التوكن والرتبة في localStorage
            if (data.token) {
                localStorage.setItem("token", data.token)
            }
            
            if (data.role) {
                localStorage.setItem("userRole", data.role)
            } else if (Array.isArray(data.roles) && data.roles.length > 0) {
                localStorage.setItem("userRole", data.roles[0])
            }

            router.push('/')
            
        } else {
            // في حالة كان الإيميل أو الباسورد غلط
            console.error("Login failed:", data.message)
            alert(data.message || "بيانات تسجيل الدخول غير صحيحة")
        }
    }
    catch (err) {
        console.error("Network Error:", err)
    }
}
    return (
        <article className={` ${theme==="light"?" bg-gray-200 text-black":" bg-gray-800 text-white"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl`}>
            <h3 className='text-4xl  capitalize text-center  font-bold mb-3  text-blue-600'>login</h3>
            <form action="">
                <input 
                className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                type="text" 
                placeholder='phone...'
                value={user.phoneNumber}
                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , phoneNumber:event.target.value})
                }}
                />
                <div className="relative">
                    <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200'
                    type={type} 
                    placeholder='password...'
                    value={user.password}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , password:event.target.value})
                }}
                    />
                    
                    <Icon onClick={handleType} className=" absolute right-3 text-[18px] top-1/2 -translate-y-1/2"/>
                </div>
                <button  onClick={HandleLogIn} className='p-3 text-[20px]  rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900'>login</button>
                <div className="flex justify-between items-center">
                    <p className='capitalize'>no account </p>
                    <a href="#" onClick={()=>{
                        setForm("signup")
                    }} className=' capitalize hover:underline'>sign up</a>
                </div>
            </form>
        </article>
)
}
