// // 






// "use client"
// import Image from 'next/image'
// import Link from 'next/link'
// import { memberType } from '../assets/assets'
// import { useThemeContext } from '../assets/contexts'
// import defaultImg from "../../public/images/st-george-killing-dragon.png" // الصورة الافتراضية

// export default function DasboardMember() {
//     const { theme } = useThemeContext()

//     return (
//         <div className={`flex items-center justify-between p-3 my-2 rounded-2xl border transition-all ${
//             theme === "light" 
//                 ? "bg-white border-gray-300 text-black shadow-sm" 
//                 : "bg-gray-700 border-gray-600 text-white"
//         }`}>
//             {/* الجزء الأيسر: الصورة والاسم ورقم الهاتف */}
//             <div className="flex items-center gap-3">
//                 {/* 📸 صورة البروفايل */}
//                 <Image
//                     src={member.image && member.image.trim() !== "" ? member.image : defaultImg}
//                     alt={member.fullName || "Member Profile"}
//                     width={50}
//                     height={50}
//                     unoptimized // يسمح بتحميل الصور الخارجية من سيرفر الـ API
//                     className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
//                 />

//                 <div>
//                     <h4 className="font-bold text-base md:text-lg capitalize">
//                         {member.fullName || "Unknown User"}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-500">
//                         {member.fullNumber || "No Phone Number"}
//                     </p>
//                 </div>
//             </div>

//             {/* الجزء الأيمن: الحالة وزر التفاصيل */}
//             <div className="flex items-center gap-3">
//                 {/* شارة حالة الحساب */}
//                 <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
//                     member.isActive 
//                         ? "bg-green-100 text-green-700" 
//                         : "bg-red-100 text-red-700"
//                 }`}>
//                     {member.isActive ? "Active" : "Inactive"}
//                 </span>

//                 {/* زر الانتقال لصفحة البروفايل */}
//                 <Link
//                     href={`/profile/${member.id}`} 
//                     className="px-3 py-1.5 bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm rounded-xl transition-colors font-medium"
//                 >
//                     View
//                 </Link>
//             </div>
//         </div>
//     )
// }
// "use client"
// import Image from 'next/image'
// import Link from 'next/link'
// import { memberType } from '../assets/assets'
// import { useThemeContext } from '../assets/contexts'
// import defaultImg from "../../public/images/st-george-killing-dragon.png" // الصورة الافتراضية

// // 1️⃣ تحديد نوع الـ Props وجعله اختياريًا لتفادي أخطاء TypeScript
// interface DasboardMemberProps {
//     member?: memberType;
// }

// // 2️⃣ استلام { member } داخل أقواس الدالة
// export default function DasboardMember({ member }: DasboardMemberProps) {
//     const { theme } = useThemeContext()

//     // التأكد من وجود رابط الصورة بشكل آمن
//     const userImage = member?.image && member.image.trim() !== "" ? member.image : defaultImg

//     return (
//         <div className={`flex items-center justify-between p-3 my-2 rounded-2xl border transition-all ${
//             theme === "light" 
//                 ? "bg-white border-gray-300 text-black shadow-sm" 
//                 : "bg-gray-700 border-gray-600 text-white"
//         }`}>
//             {/* الجزء الأيسر: الصورة والاسم ورقم الهاتف */}
//             <div className="flex items-center gap-3">
//                 {/* 📸 صورة البروفايل */}
//                 <Image
//                     src={userImage}
//                     alt={member?.fullName || "Member Profile"}
//                     width={50}
//                     height={50}
//                     unoptimized // يسمح بتحميل الصور الخارجية من سيرفر الـ API
//                     className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
//                 />

//                 <div>
//                     <h4 className="font-bold text-base md:text-lg capitalize">
//                         {member?.fullName || "Unknown User"}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-500">
//                         {member?.fullNumber || "No Phone Number"}
//                     </p>
//                 </div>
//             </div>

//             {/* الجزء الأيمن: الحالة وزر التفاصيل */}
//             <div className="flex items-center gap-3">
//                 {/* شارة حالة الحساب */}
//                 <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
//                     member?.isActive 
//                         ? "bg-green-100 text-green-700" 
//                         : "bg-red-100 text-red-700"
//                 }`}>
//                     {member?.isActive ? "Active" : "Inactive"}
//                 </span>

//                 {/* زر الانتقال لصفحة البروفايل */}
//                 <Link
//                     href={`/profile/${member?.id || ''}`} 
//                     className="px-3 py-1.5 bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm rounded-xl transition-colors font-medium"
//                 >
//                     View
//                 </Link>
//             </div>
//         </div>
//     )
// }

"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { memberType } from '../assets/assets'
import DasboardMember from './DasboardMember'
import { useFormContext, useThemeContext } from '../assets/contexts'
import { Search } from 'react-bootstrap-icons'

interface UserApiDto {
    id?: string;
    userId?: string;
    fullName?: string;
    name?: string;
    phoneNumber?: string;
    fullNumber?: string;
    phone?: string;
    photoUrl?: string;
    image?: string;
    role?: string;
    isActive?: boolean;
}

export default function DashboardMembers() {
    const { setForm } = useFormContext()
    const [searchValue, setSearchValue] = useState<string>("")
    const { theme } = useThemeContext()

    const [allUsers, setAllUsers] = useState<memberType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true) // بدأنا بـ true افتراضياً
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        let isMounted = true

        const fetchUsers = async () => {
            try {
                const token = typeof window !== 'undefined' 
                    ? (localStorage.getItem("token") || localStorage.getItem("userToken"))
                    : null

                // 🌐 الانتظار جلب البيانات من الـ API دون استدعاء setState قبل الـ await
                const response = await fetch("https://mahinproject.runasp.net/api/User/get-all-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { "Authorization": `Bearer ${token}` } : {})
                    }
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("غير مصرح: يرجى تسجيل الدخول أولاً (401)")
                    }
                    throw new Error(`خطأ من السيرفر كود: ${response.status}`)
                }

                const rawData = await response.json()

                // استخراج المصفوفة بأمان
                let usersArray: UserApiDto[] = []
                if (Array.isArray(rawData)) {
                    usersArray = rawData
                } else if (rawData && Array.isArray(rawData.data)) {
                    usersArray = rawData.data
                } else if (rawData && Array.isArray(rawData.result)) {
                    usersArray = rawData.result
                } else if (rawData && Array.isArray(rawData.users)) {
                    usersArray = rawData.users
                }

                const mappedUsers: memberType[] = usersArray.map((u, index) => ({
                    id: u.id || u.userId || String(index),
                    fullName: u.fullName || u.name || "عضو بدون اسم",
                    fullNumber: u.phoneNumber || u.fullNumber || u.phone || "بدون رقم",
                    image: u.photoUrl || u.image || "",
                    role: u.role || "User",
                    isActive: u.isActive ?? true
                }))

                // ⚡ استدعاء setState فقط بعد انتهاء الـ Async Process
                if (isMounted) {
                    setAllUsers(mappedUsers)
                    setErrorMessage("")
                    setIsLoading(false)
                }
            } catch (err: unknown) {
                if (isMounted) {
                    console.error("Error fetching users:", err)
                    setErrorMessage(err instanceof Error ? err.message : "تعذر الاتصال بالسيرفر")
                    setIsLoading(false)
                }
            }
        }

        fetchUsers()

        return () => {
            isMounted = false
        }
    }, [])

    // فلترة قائمة البحث
    const filteredUsers = allUsers.filter((user) => {
        const query = searchValue.toLowerCase().trim()
        return (
            (user.fullName && user.fullName.toLowerCase().includes(query)) ||
            (user.fullNumber && user.fullNumber.includes(query))
        )
    })

    const isDark = theme === "dark"

    return (
        <article className={`p-4 rounded-3xl mb-2.5 border backdrop-blur-sm ${
            isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.32)]'
                : 'bg-white/90 border-slate-200 text-slate-800 shadow-[0_18px_40px_rgba(148,163,184,0.18)]'
        }`}>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className='text-2xl font-bold capitalize text-blue-600'>All Members ({filteredUsers.length})</h3>

                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder='ابحث بالاسم أو رقم الهاتف...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-full rounded-2xl border p-3 text-sm outline-none transition-colors ${
                            isDark
                                ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400'
                                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                        }`}
                    />
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-600" />
                </div>
            </div>

            {isLoading ? (
                <div className="py-8 text-center font-bold text-blue-600 animate-pulse">
                    جاري جلب بيانات الأعضاء...
                </div>
            ) : errorMessage ? (
                <div className="rounded-2xl bg-red-500/10 p-3 text-center font-semibold text-red-500">
                    {errorMessage}
                </div>
            ) : filteredUsers.length > 0 ? (
                <div className="space-y-3">
                    {filteredUsers.map((member) => (
                        <DasboardMember key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="py-6 text-center text-sm text-slate-500">
                    لا يوجد أعضاء لعرضهم.
                </div>
            )}

            <Link
                onClick={() => setForm("signup")}
                className='mt-4 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:translate-y-[-1px] hover:shadow-blue-500/40'
                href={"/register"}
            >
                Add Member
            </Link>
        </article>
    )
}