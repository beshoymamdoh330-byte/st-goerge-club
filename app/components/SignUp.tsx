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






// "use client"
// import { useState } from "react"
// import { LockFill, UnlockFill } from "react-bootstrap-icons"
// import { SignupUser } from "../assets/assets"
// import { useFormContext, useThemeContext, useUsersContext } from "../assets/contexts"
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// export default function SignUp() {
//     const [showPassword, setShowPassword] = useState<boolean>(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
//     const [loading, setLoading] = useState<boolean>(false)

//     const { setForm } = useFormContext()
//     const { theme } = useThemeContext()
//     const { users, setUsers } = useUsersContext()
//     const router = useRouter()

//     const [user, setUser] = useState<SignupUser>({
//         id: "",
//         confirmPassword: "",
//         gender: "1", // تعيين القيمة الافتراضية 1 (male)
//         userName: "",
//         fullName: "",
//         number: "",
//         fullNumber: "",
//         image: "",
//         type: "1", // تعيين القيمة الافتراضية 1 رقمياً
//         email: "",
//         password: ""
//     })

//     const clearInputs = () => {
//         setUser({
//             id: "",
//             confirmPassword: "",
//             gender: "1",
//             userName: "",
//             fullName: "",
//             number: "",
//             fullNumber: "",
//             image: "",
//             type: "1",
//             email: "",
//             password: ""
//         })
//     }

//     // 🌐 دالة التسجيل المربوطة بالـ API بالأسماء والأنواع الصحيحة
//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault()

//         if (user.password !== user.confirmPassword) {
//             alert("كلمتا السر غير متطابقتين!")
//             return
//         }

//         setLoading(true)

//         // تجهيز الـ JSON بالضبط كما يطلبه الـ API
//         const payload = {
//             email: user.email,
//             phoneNumber: user.number || user.fullNumber,
//             password: user.password,
//             confirmPassword: user.confirmPassword,
//             fullName: user.fullName || user.userName,
//             gender: Number(user.gender),     // تحويل القيمة إلى رقم Integer
//             photoUrl: user.image || "",      // تم تعديل الاسم إلى photoUrl
//             ageGroup: Number(user.type)      // تحويل المرحلة إلى رقم Integer
//         }

//         try {
//             const res = await fetch("https://mahinproject.runasp.net/api/Auth/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             })

//             const data = await res.json()

//             if (res.ok) {
//                 alert("تم إنشاء الحساب بنجاح! 🎉")
//                 setUsers([...users, user])
//                 clearInputs()
                
//                 if (setForm) setForm("login")
//                 router.push("/login")
//             } else {
//                 console.error("Validation Errors from Server:", data)

//                 if (data.errors) {
//                     const errorMessages = Object.entries(data.errors)
//                         .map(([key, msgs]) => `${key}: ${(msgs as string[]).join(", ")}`)
//                         .join("\n")
//                     alert(`خطأ في البيانات المدخلة:\n${errorMessages}`)
//                 } else {
//                     alert(data.message || data.title || "حدث خطأ أثناء إنشاء الحساب.")
//                 }
//             }
//         } catch (error) {
//             console.error("Registration Error:", error)
//             alert("حدث خطأ في الاتصال بالخادم!")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <article className={` ${theme === "light" ? "bg-gray-200 text-black" : "text-white bg-gray-800"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl mx-auto`}>
//             <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>create account</h3>
            
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-2" onSubmit={handleRegister}>
//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="text" 
//                     placeholder='full name / username...'
//                     value={user.userName}
//                     onChange={(e) => setUser({ ...user, userName: e.target.value, fullName: e.target.value })}
//                     required
//                 />

//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="text" 
//                     placeholder='phone number...'
//                     value={user.number}
//                     onChange={(e) => setUser({ ...user, number: e.target.value, fullNumber: e.target.value })}
//                     required
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
//                     <label className="w-full mb-1 block">Choose age group / stage:</label>
//                     <select 
//                         className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                         value={user.type}
//                         onChange={(e) => setUser({ ...user, type: e.target.value })}
//                     >
//                         <option value="0">prep</option> 
//                         <option value="1">prime</option> 
//                         <option value="2">second</option> 
//                         <option value="3">uni & grads</option> 
//                         {/* <option value="4">grads</option>  */}
//                     </select>
//                 </div>
                
//                 <input 
//                     className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200 text-black outline-none' 
//                     type="email" 
//                     placeholder='email address...'
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                     required
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
//                                 value="0" 
//                                 checked={user.gender === "0"}
//                             />
//                         </div>
//                         <div className="flex items-center gap-2.5">
//                             <label htmlFor="female">female</label>
//                             <input 
//                                 onChange={(e) => setUser({ ...user, gender: e.target.value })} 
//                                 type="radio" 
//                                 id="female" 
//                                 value="1" 
//                                 checked={user.gender === "1"}
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
//                         required
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
//                         required
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
//                     type="submit"
//                     disabled={loading}
//                     className='p-3 text-[20px] col-span-1 md:col-span-2 rounded-2xl bg-blue-600 text-white font-semibold w-full mb-2 hover:bg-blue-900 cursor-pointer transition-colors disabled:bg-gray-400'
//                 >
//                     {loading ? "Creating account..." : "create account"}
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
        gender: "1", // القيمة الافتراضية 1
        userName: "",
        fullName: "",
        number: "",
        fullNumber: "",
        image: "",
        type: "1", // القيمة الافتراضية 1
        email: "",
        password: ""
    })

    const clearInputs = () => {
        setUser({
            id: "",
            confirmPassword: "",
            gender: "1",
            userName: "",
            fullName: "",
            number: "",
            fullNumber: "",
            image: "",
            type: "1",
            email: "",
            password: ""
        })
    }

    // 🌐 دالة التسجيل + التوجيه التلقائي لصفحة الـ Welcome
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (user.password !== user.confirmPassword) {
            alert("كلمتا السر غير متطابقتين!")
            return
        }

        setLoading(true)

        const payload = {
            email: user.email,
            phoneNumber: user.number || user.fullNumber,
            password: user.password,
            confirmPassword: user.confirmPassword,
            fullName: user.fullName || user.userName,
            gender: Number(user.gender),
            photoUrl: user.image || "",
            ageGroup: Number(user.type)
        }

        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (res.ok) {
                let token = data.token
                let role = data.role || (Array.isArray(data.roles) && data.roles[0])

                // 🔄 إذا لم يرجع الـ Register توكن مباشرة، نقوم بتسجيل الدخول تلقائياً
                if (!token) {
                    try {
                        const loginRes = await fetch("https://mahinproject.runasp.net/api/Auth/login", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                phoneNumber: payload.phoneNumber,
                                password: payload.password
                            })
                        })

                        const loginData = await loginRes.json()
                        if (loginRes.ok && loginData.token) {
                            token = loginData.token
                            role = loginData.role || (Array.isArray(loginData.roles) && loginData.roles[0])
                        }
                    } catch (loginErr) {
                        console.error("Auto-login error:", loginErr)
                    }
                }

                // 🔑 حفظ بيانات الجلسة وتوجيه المستخدم للـ Welcome
                if (token) {
                    localStorage.setItem("token", token)
                    if (role) localStorage.setItem("userRole", role)
                    
                    setUsers([...users, user])
                    clearInputs()
                    router.push('/welcome')
                } else {
                    // في حالة عدم الحصول على التوكن يُعاد توجيهه لصفحة اللوجن
                    if (setForm) setForm("login")
                    router.push('/login')
                }
            } else {
                console.error("Validation Errors from Server:", data)

                if (data.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([key, msgs]) => `${key}: ${(msgs as string[]).join(", ")}`)
                        .join("\n")
                    alert(`خطأ في البيانات المدخلة:\n${errorMessages}`)
                } else {
                    alert(data.message || data.title || "حدث خطأ أثناء إنشاء الحساب.")
                }
            }
        } catch (error) {
            console.error("Registration Error:", error)
            alert("حدث خطأ في الاتصال بالخادم!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <article className={`${theme === "light" ? "bg-gray-200 text-black" : "text-white bg-gray-800"} w-11/12 border border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl mx-auto`}>
            <h3 className='text-4xl capitalize text-center font-bold mb-3 text-blue-600'>create account</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-2" onSubmit={handleRegister}>
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none' 
                    type="text" 
                    placeholder='full name / username...'
                    value={user.userName}
                    onChange={(e) => setUser({ ...user, userName: e.target.value, fullName: e.target.value })}
                    required
                />

                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none' 
                    type="text" 
                    placeholder='phone number...'
                    value={user.number}
                    onChange={(e) => setUser({ ...user, number: e.target.value, fullNumber: e.target.value })}
                    required
                />

                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700' 
                    type="file" 
                    accept="image/*"
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
                    <label className="w-full mb-1 block text-sm font-semibold">Choose age group / stage:</label>
                    <select 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none' 
                        value={user.type}
                        onChange={(e) => setUser({ ...user, type: e.target.value })}
                    >
                        <option value="0">ابتدائي</option> 
                        <option value="1">اعدادي</option> 
                        <option value="2">ثانوي </option> 
                        <option value="3">جامعه و خرجين</option> 
                        <option value="3">غير ذالك</option> 
                    </select>
                </div>
                
                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none' 
                    type="email" 
                    placeholder='email address...'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />

                <div className="p-3 text-[18px] border rounded-2xl border-blue-600 w-full">
                    <p className="mb-1 font-semibold text-sm">Select gender:</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <label htmlFor="male" className="cursor-pointer">male</label>
                            <input 
                                onChange={(e) => setUser({ ...user, gender: e.target.value })} 
                                type="radio" 
                                id="male" 
                                value="0" 
                                checked={user.gender === "0"}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center gap-2.5">
                            <label htmlFor="female" className="cursor-pointer">female</label>
                            <input 
                                onChange={(e) => setUser({ ...user, gender: e.target.value })} 
                                type="radio" 
                                id="female" 
                                value="1" 
                                checked={user.gender === "1"}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none'
                        type={showPassword ? "text" : "password"} 
                        placeholder='password...'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(prev => !prev)} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                        {showPassword ? <UnlockFill /> : <LockFill />}
                    </button>
                </div>

                <div className="relative">
                    <input 
                        className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-800 text-black dark:text-white dark:bg-gray-700 outline-none'
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder='confirm password...'
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(prev => !prev)} 
                        className="absolute right-3 text-[18px] top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 dark:text-gray-300"
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