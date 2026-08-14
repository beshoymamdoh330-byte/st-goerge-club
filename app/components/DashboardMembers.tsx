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

    return (
        <article className={`p-4 rounded-2xl mb-2.5 ${theme === "light" ? "text-black bg-gray-200" : "bg-gray-800 text-white"} border-r-4 border-b-4 border-blue-600`}>
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row mb-4 gap-2">
                <h3 className='text-2xl capitalize text-blue-600 font-bold'>All Members ({filteredUsers.length})</h3>

                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder='ابحث بالاسم أو رقم الهاتف...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className='w-full p-3 border border-blue-600 rounded-2xl outline-none bg-transparent text-sm'
                    />
                    <Search className="absolute top-1/2 right-3.5 -translate-y-1/2 text-blue-600" />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-blue-600 font-bold animate-pulse">
                    جاري جلب بيانات الأعضاء...
                </div>
            ) : errorMessage ? (
                <div className="text-center py-6 text-red-500 font-semibold bg-red-100/10 rounded-xl p-3">
                    {errorMessage}
                </div>
            ) : filteredUsers.length > 0 ? (
                filteredUsers.map((member) => (
                    <DasboardMember key={member.id} member={member} />
                ))
            ) : (
                <div className="text-center py-6 text-gray-500 font-medium">
                    لا يوجد أعضاء لعرضهم.
                </div>
            )}

            <Link
                onClick={() => setForm("signup")}
                className='text-center mt-4 p-3 capitalize bg-blue-600 block w-full rounded-2xl hover:bg-blue-800 text-white transition-colors font-bold'
                href={"/register"}
            >
                Add Member
            </Link>
        </article>
    )
}