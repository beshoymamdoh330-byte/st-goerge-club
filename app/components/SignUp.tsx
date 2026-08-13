// 





// "use client"
// import { useState } from "react"
// import { LockFill, UnlockFill } from "react-bootstrap-icons"
// import { SignupUser } from "../assets/assets"
// import { useFormContext, useThemeContext, useUsersContext } from "../assets/contexts"
// import Link from 'next/link'

// export default function SignUp() {
//     const [showPassword, setShowPassword] = useState<boolean>(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

//     const { setForm } = useFormContext()
//     const { theme } = useThemeContext()
//     const { users, setUsers } = useUsersContext()

//     // 1️⃣ تحديث حالة المستخدم بالكامل مع الخصائص الناقصة لتفادي أخطاء TypeScript في Vercel
//     const [user, setUser] = useState<SignupUser>({
//         id: "",
//         confirmPassword: "",
//         gender: "",
//         userName: "",
//         fullName: "",     // 👈 تم إضافة الخاصية المطلوبة
//         number: "",
//         fullNumber: "",   // 👈 تم إضافة الخاصية المطلوبة
//         image: "",
//         type: "prep",
//         email: "",
//         password: ""
//     })

//     // 2️⃣ دالة مسح البيانات بعد التسجيل (مرة واحدة فقط لمنع خطأ المكرر)
//     const clearInputs = () => {
//         setUser({
//             id: "",
//             confirmPassword: "",
//             gender: "",
//             userName: "",
//             fullName: "",
//             number: "",
//             fullNumber: "",
//             image: "",
//             type: "prep",
//             email: "",
//             password: ""
//         })
//     }

//     const handleAddUser = () => {
//         setUsers([...users, user])
//         clearInputs()
//     }

//     return (
//         <article className={` ${theme === "light" ? "bg-gray-200 text-black" : "text-white bg-gray-800"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl mx-auto`}>
//             <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>create account</h3>
            
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-2" onSubmit={(e) => e.preventDefault()}>
//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="text" 
//                     placeholder='username...'
//                     value={user.userName}
//                     onChange={(e) => setUser({ ...user, userName: e.target.value })}
//                 />

//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="text" 
//                     placeholder='phone number...'
//                     value={user.number}
//                     onChange={(e) => setUser({ ...user, number: e.target.value })}
//                 />

//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black' 
//                     type="file" 
//                     onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (!file) return;
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                             setUser({ ...user, image: reader.result as string });
//                         };
//                         reader.readAsDataURL(file);
//                     }}
//                 />

//                 <div>
//                     <label className="w-full mb-1 block">Choose a stage:</label>
//                     <select 
//                         className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                         value={user.type}
//                         onChange={(e) => setUser({ ...user, type: e.target.value })}
//                     >
//                         <option value="prep">prep</option> 
//                         <option value="prime">prime</option> 
//                         <option value="second">second</option> 
//                         <option value="uni">uni</option> 
//                         <option value="grads">grads</option> 
//                     </select>
//                 </div>
                
//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="email" 
//                     placeholder='email address...'
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                 />

//                 <div className="p-3 text-[18px] border rounded-2xl border-blue-600 w-full">
//                     <p className="mb-1 font-semibold">Select gender:</p>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2.5">
//                             <label htmlFor="male">male</label>
//                             <input 
//                                 onChange={(e) => setUser({ ...user, gender: e.target.value })} 
//                                 type="radio" 
//                                 id="male" 
//                                 value="male" 
//                                 checked={user.gender === "male"}
//                             />
//                         </div>
//                         <div className="flex items-center gap-2.5">
//                             <label htmlFor="female">female</label>
//                             <input 
//                                 onChange={(e) => setUser({ ...user, gender: e.target.value })} 
//                                 type="radio" 
//                                 id="female" 
//                                 value="female" 
//                                 checked={user.gender === "female"}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="relative">
//                     <input 
//                         className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none'
//                         type={showPassword ? "text" : "password"} 
//                         placeholder='password...'
//                         value={user.password}
//                         onChange={(e) => setUser({ ...user, password: e.target.value })}
//                     />
//                     <button 
//                         type="button" 
//                         onClick={() => setShowPassword(prev => !prev)} 
//                         className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
//                     >
//                         {showPassword ? <UnlockFill /> : <LockFill />}
//                     </button>
//                 </div>

//                 <div className="relative">
//                     <input 
//                         className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none'
//                         type={showConfirmPassword ? "text" : "password"} 
//                         placeholder='confirm password...'
//                         value={user.confirmPassword}
//                         onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
//                     />
//                     <button 
//                         type="button" 
//                         onClick={() => setShowConfirmPassword(prev => !prev)} 
//                         className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
//                     >
//                         {showConfirmPassword ? <UnlockFill /> : <LockFill />}
//                     </button>
//                 </div>

//                 <button 
//                     type="button"
//                     onClick={() => {
//                         handleAddUser();
//                         if (setForm) setForm("login");
//                     }}
//                     className='p-3 text-[20px] col-span-1 md:col-span-2 rounded-2xl bg-blue-600 text-white font-semibold w-full mb-2 hover:bg-blue-900 cursor-pointer transition-colors'
//                 >
//                     create account
//                 </button>

//                 <div className="flex justify-between col-span-1 md:col-span-2 items-center mt-2">
//                     <p className='capitalize'>have account?</p>
//                     <Link 
//                         href="/login" 
//                         className='capitalize hover:underline text-blue-600 font-semibold cursor-pointer'
//                     >
//                         login
//                     </Link>
//                 </div>
//             </form>
//         </article>
//     )
// }






"use client"
import { useState } from "react"
import { LockFill, UnlockFill } from "react-bootstrap-icons"
import { SignupUser } from "../assets/assets"
import { useFormContext, useThemeContext, useUsersContext } from "../assets/contexts"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { setForm } = useFormContext()
    const { theme } = useThemeContext()
    const { users, setUsers } = useUsersContext()
    const router = useRouter()

    const [user, setUser] = useState<SignupUser>({
        id: "",
        confirmPassword: "",
        gender: "",
        userName: "",
        fullName: "",
        number: "",
        fullNumber: "",
        image: "",
        type: "prep",
        email: "",
        password: ""
    })

    const clearInputs = () => {
        setUser({
            id: "",
            confirmPassword: "",
            gender: "",
            userName: "",
            fullName: "",
            number: "",
            fullNumber: "",
            image: "",
            type: "prep",
            email: "",
            password: ""
        })
    }

    // 🌐 دالة الإرسال لـ API الـ Register
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (user.password !== user.confirmPassword) {
            alert("كلمتا السر غير متطابقتين!")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: user.userName,
                    fullName: user.fullName || user.userName,
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.number || user.fullNumber,
                    gender: user.gender,
                    type: user.type,
                    image: user.image
                })
            })

            const data = await res.json()

            if (res.ok) {
                alert("تم إنشاء الحساب بنجاح! 🎉")
                setUsers([...users, user])
                clearInputs()
                
                // الانتقال لصفحة اللوجن
                if (setForm) setForm("login")
                router.push("/login")
            } else {
                alert(data.message || data.title || "حدث خطأ أثناء إنشاء الحساب، أعد المحاولة.")
            }
        } catch (error) {
            console.error("Registration Error:", error)
            alert("حدث خطأ في الاتصال بالخادم!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <article className={` ${theme === "light" ? "bg-gray-200 text-black" : "text-white bg-gray-800"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl mx-auto`}>
            <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>create account</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-2" onSubmit={handleRegister}>
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
                    type="text" 
                    placeholder='username...'
                    value={user.userName}
                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    required
                />

                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
                    type="text" 
                    placeholder='phone number...'
                    value={user.number}
                    onChange={(e) => setUser({ ...user, number: e.target.value })}
                    required
                />

                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black' 
                    type="file" 
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setUser({ ...user, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                    }}
                />

                <div>
                    <label className="w-full mb-1 block">Choose a stage:</label>
                    <select 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
                        value={user.type}
                        onChange={(e) => setUser({ ...user, type: e.target.value })}
                    >
                        <option value="prep">prep</option> 
                        <option value="prime">prime</option> 
                        <option value="second">second</option> 
                        <option value="uni">uni</option> 
                        <option value="grads">grads</option> 
                    </select>
                </div>
                
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
                    type="email" 
                    placeholder='email address...'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />

                <div className="p-3 text-[18px] border rounded-2xl border-blue-600 w-full">
                    <p className="mb-1 font-semibold">Select gender:</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <label htmlFor="male">male</label>
                            <input 
                                onChange={(e) => setUser({ ...user, gender: e.target.value })} 
                                type="radio" 
                                id="male" 
                                value="male" 
                                checked={user.gender === "male"}
                            />
                        </div>
                        <div className="flex items-center gap-2.5">
                            <label htmlFor="female">female</label>
                            <input 
                                onChange={(e) => setUser({ ...user, gender: e.target.value })} 
                                type="radio" 
                                id="female" 
                                value="female" 
                                checked={user.gender === "female"}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none'
                        type={showPassword ? "text" : "password"} 
                        placeholder='password...'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(prev => !prev)} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                    >
                        {showPassword ? <UnlockFill /> : <LockFill />}
                    </button>
                </div>

                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none'
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder='confirm password...'
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(prev => !prev)} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                    >
                        {showConfirmPassword ? <UnlockFill /> : <LockFill />}
                    </button>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className='p-3 text-[20px] col-span-1 md:col-span-2 rounded-2xl bg-blue-600 text-white font-semibold w-full mb-2 hover:bg-blue-900 cursor-pointer transition-colors disabled:bg-gray-400'
                >
                    {loading ? "Creating account..." : "create account"}
                </button>

                <div className="flex justify-between col-span-1 md:col-span-2 items-center mt-2">
                    <p className='capitalize'>have account?</p>
                    <Link 
                        href="/login" 
                        className='capitalize hover:underline text-blue-600 font-semibold cursor-pointer'
                    >
                        login
                    </Link>
                </div>
            </form>
        </article>
    )
}