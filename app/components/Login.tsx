// // 


// "use client"
// import { useState } from "react"
// import { LockFill, UnlockFill } from "react-bootstrap-icons"
// import { LoginUser } from "../assets/assets"
// import { useFormContext, useThemeContext } from "../assets/contexts"
// import { useRouter } from 'next/navigation' 
// import Link from 'next/link'

// export default function Login() {
//     const [type, setType] = useState<string>("password")
//     const [IsLocked, setIsLocked] = useState<boolean>(true)
//     const [user, setUser] = useState<LoginUser>({ phoneNumber: "", password: "" })
//     const { setForm } = useFormContext()
//     const { theme } = useThemeContext()
//     const router = useRouter()

//     const handleType = () => {
//         setType(prev => prev === "password" ? "text" : "password")
//         setIsLocked(prev => !prev)
//     }

//     const HandleLogIn = async (e: React.MouseEvent | React.FormEvent) => {
//         e.preventDefault()
        
//         try {
//             const res = await fetch("https://mahinproject.runasp.net/api/Auth/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(user)
//             })

//             const data = await res.json()

//             if (res.ok) {
//                 if (data.token) localStorage.setItem("token", data.token)
                
//                 if (data.role) {
//                     localStorage.setItem("userRole", data.role)
//                 } else if (Array.isArray(data.roles) && data.roles.length > 0) {
//                     localStorage.setItem("userRole", data.roles[0])
//                 }

//                 // 🎯 التوجيه لصفحة الـ Welcome بعد تسجيل الدخول بنجاح
//                 router.push('/welcome')
//             } else {
//                 alert(data.message || "بيانات تسجيل الدخول غير صحيحة")
//             }
//         } catch (err) {
//             console.error("Network Error:", err)
//         }
//     }

//     return (
//         <article className={`${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} w-11/12 border border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl`}>
//             <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>login</h3>
            
//             <form onSubmit={HandleLogIn}>
//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 dark:text-black' 
//                     type="text" 
//                     placeholder='phone...'
//                     value={user.phoneNumber}
//                     onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
//                 />
                
//                 <div className="relative">
//                     <input 
//                         className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 dark:text-black'
//                         type={type} 
//                         placeholder='password...'
//                         value={user.password}
//                         onChange={(e) => setUser({ ...user, password: e.target.value })}
//                     />
                    
//                     <button 
//                         type="button" 
//                         onClick={handleType} 
//                         className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 dark:text-gray-300"
//                     >
//                         {IsLocked ? <LockFill /> : <UnlockFill />}
//                     </button>
//                 </div>

//                 <button type="submit" className='p-3 text-[20px] rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900 text-white font-semibold cursor-pointer transition-colors'>
//                     login
//                 </button>

//                 <div className="flex justify-between items-center mt-2">
//                     <p className='capitalize'>no account?</p>
                    
//                     <Link 
//                         href="/register" 
//                         className='capitalize hover:underline text-blue-600 font-semibold'
//                     >
//                         sign up
//                     </Link>
//                 </div>
//             </form>
//         </article>
//     )
// }





"use client"
import { useState } from "react"
import { LockFill, UnlockFill } from "react-bootstrap-icons"
import { LoginUser } from "../assets/assets"
import { useFormContext, useThemeContext } from "../assets/contexts"
import { useRouter } from 'next/navigation' 
import Link from 'next/link'

export default function Login() {
    const [type, setType] = useState<string>("password")
    const [IsLocked, setIsLocked] = useState<boolean>(true)
    const [user, setUser] = useState<LoginUser>({ phoneNumber: "", password: "" })
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const { setForm } = useFormContext()
    const { theme } = useThemeContext()
    const router = useRouter()

    const handleType = () => {
        setType(prev => prev === "password" ? "text" : "password")
        setIsLocked(prev => !prev)
    }

    const HandleLogIn = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault()
        setErrorMessage("")
        setLoading(true)
        
        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await res.json()
            console.log("Response Data from API:", data)

            if (res.ok) {
                // 1. حفظ التوكن
                if (data.token) {
                    localStorage.setItem("token", data.token)
                }

                let extractedRole = ""

                // 2. محاولة قراءة الـ Role المباشر
                if (data.role) {
                    extractedRole = typeof data.role === 'string' ? data.role : JSON.stringify(data.role)
                } else if (Array.isArray(data.roles) && data.roles.length > 0) {
                    extractedRole = data.roles[0]
                }

                // 3. فك تشفير الـ JWT Token لاستخراج الـ Role في حال عدم وجوده كعنصر صريح
                if (!extractedRole && data.token) {
                    try {
                        const base64Url = data.token.split('.')[1]
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        }).join(''))

                        const decodedToken = JSON.parse(jsonPayload)
                        console.log("Decoded JWT Payload:", decodedToken)

                        // قراءة ادعاء الـ Role الخاص بـ ASP.NET Identity أو الادعاءات العادية
                        extractedRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] 
                                     || decodedToken.role 
                                     || decodedToken.roles 
                                     || ""
                    } catch (e) {
                        console.error("Failed to decode JWT token:", e)
                    }
                }

                console.log("Final Extracted Role:", extractedRole)
                localStorage.setItem("userRole", String(extractedRole))

                // 📢 4. إطلاق الأحداث لتحديث الـ Sidebar تلقائياً
                window.dispatchEvent(new Event("auth-change"))
                window.dispatchEvent(new Event("storage"))

                // 🎯 5. التوجيه الذكي
                if (String(extractedRole).toLowerCase().includes("admin")) {
                    router.push('/dashboard')
                } else {
                    router.push('/welcome')
                }

            } else {
                setErrorMessage(data.message || "بيانات تسجيل الدخول غير صحيحة")
            }
        } catch (err) {
            console.error("Network Error:", err)
            setErrorMessage("حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً")
        } finally {
            setLoading(false)
        }
    }

    return (
        <article className={`${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} w-11/12 border border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl shadow-lg`}>
            <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>login</h3>
            
            {errorMessage && (
                <div className="mb-3 p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-300 rounded-xl text-center font-semibold">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={HandleLogIn}>
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 dark:text-white outline-none transition-all' 
                    type="text" 
                    placeholder='phone...'
                    value={user.phoneNumber}
                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    required
                />
                
                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 dark:text-white outline-none transition-all'
                        type={type} 
                        placeholder='password...'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    
                    <button 
                        type="button" 
                        onClick={handleType} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                        {IsLocked ? <LockFill /> : <UnlockFill />}
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className='p-3 text-[20px] rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900 text-white font-semibold cursor-pointer transition-colors disabled:bg-blue-400'
                >
                    {loading ? "جاري الدخول..." : "login"}
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