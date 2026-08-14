// "use client"

// import React, { useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { jwtDecode } from 'jwt-decode'
// import { memberType } from '../assets/assets'
// import img from "../../public/images/st-george-killing-dragon.png"

// interface DecodedToken {
//     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
//     [key: string]: unknown;
// }

// export default function DashboardMember({ member }: { member: memberType }) {
//     const [activToggle, setActiveToggle] = useState<boolean>(member.isActive)
//     const router = useRouter()

//     const handleProfileClick = () => {
//         const token = localStorage.getItem("token")
        
//         if (!token) {
//             router.push('/login')
//             return
//         }

//         try {
//             // إضافة as DecodedToken لحل خطأ TypeScript TS7053
//             const decoded = jwtDecode(token) as DecodedToken
//             const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

//             let isAdmin = false
//             if (Array.isArray(roleClaim)) {
//                 isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
//             } else if (typeof roleClaim === 'string') {
//                 isAdmin = roleClaim.toLowerCase() === 'admin'
//             }

//             if (isAdmin) {
//                 router.push(`/viewProfile/${member.id}`)
//             } else {
//                 router.push('/login')
//             }
//         } catch (err) {
//             console.error("Token parsing error:", err)
//             localStorage.removeItem("token")
//             router.push('/login')
//         }
//     }

//     const handleToggleActive = async () => {
//         const nextState = !activToggle
//         setActiveToggle(nextState)

//         try {
//             const token = localStorage.getItem("token")
//             const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token ? `Bearer ${token}` : ''
//                 },
//                 body: JSON.stringify({ ...member, isActive: nextState })
//             })

//             if (!response.ok) {
//                 setActiveToggle(activToggle)
//             }
//         } catch (err) {
//             console.error("Toggle active error:", err)
//             setActiveToggle(activToggle)
//         }
//     } 

//     return (
//         <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
//             <div onClick={handleProfileClick} className="cursor-pointer">
//                 <Image 
//                     src={member.image ? member.image : img}
//                     alt='member photo'
//                     width={80}
//                     height={80}
//                     className='w-20 h-20 rounded-full object-cover hover:opacity-80 transition-opacity'
//                 />
//             </div>

//             <h3 className='text-2xl text-blue-600'>{member.fullName}</h3>
            
//             <h3 className='text-2xl text-blue-600'>
//                 الاشتراك: {activToggle ? "نشط" : "غير نشط"}
//             </h3>

//             <button 
//                 onClick={handleToggleActive} 
//                 className={`p-3 text-white rounded-3xl cursor-pointer transition-colors ${
//                     activToggle ? "bg-red-700 hover:bg-red-800" : "bg-green-700 hover:bg-green-800"
//                 }`}
//             >
//                 {activToggle ? "إلغاء التفعيل" : "تفعيل"}
//             </button>
//         </div>
//     )
// }


"use client"
import Image from 'next/image'
import Link from 'next/link'
import { memberType } from '../assets/assets'
import { useThemeContext } from '../assets/contexts'
import defaultImg from "../../public/images/st-george-killing-dragon.png"

// 1️⃣ تعريف واجهة الـ Props
interface DasboardMemberProps {
    member?: memberType;
}

// 2️⃣ استلام { member } كـ Prop داخل المكون
export default function DasboardMember({ member }: DasboardMemberProps) {
    const { theme } = useThemeContext()

    const userImage = member?.image && member.image.trim() !== "" ? member.image : defaultImg

    return (
        <div className={`flex items-center justify-between p-3 my-2 rounded-2xl border transition-all ${
            theme === "light" 
                ? "bg-white border-gray-300 text-black shadow-sm" 
                : "bg-gray-700 border-gray-600 text-white"
        }`}>
            {/* الجزء الأيسر: الصورة والاسم ورقم الهاتف */}
            <div className="flex items-center gap-3">
                <Image
                    src={userImage}
                    alt={member?.fullName || "Member Profile"}
                    width={50}
                    height={50}
                    unoptimized
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                />

                <div>
                    <h4 className="font-bold text-base md:text-lg capitalize">
                        {member?.fullName || "Unknown User"}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                        {member?.fullNumber || "No Phone Number"}
                    </p>
                </div>
            </div>

            {/* الجزء الأيمن: الحالة وزر التفاصيل */}
            <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
                    member?.isActive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                }`}>
                    {member?.isActive ? "Active" : "Inactive"}
                </span>

                <Link
                    href={`/profile/${member?.id || ''}`} 
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm rounded-xl transition-colors font-medium"
                >
                    View
                </Link>
            </div>
        </div>
    )
}