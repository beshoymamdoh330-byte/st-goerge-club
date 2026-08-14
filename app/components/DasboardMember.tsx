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
    const isDark = theme === "dark"

    const userImage = member?.image && member.image.trim() !== "" ? member.image : defaultImg

    return (
        <div className={`flex flex-col gap-3 rounded-2xl border p-3 transition-all duration-300 md:flex-row md:items-center md:justify-between ${
            isDark
                ? "border-slate-700 bg-slate-800/80 text-slate-100 shadow-[0_8px_20px_rgba(15,23,42,0.18)]"
                : "border-slate-200 bg-slate-50 text-slate-800 shadow-[0_8px_20px_rgba(148,163,184,0.12)]"
        }`}>
            <div className="flex items-center gap-3">
                <Image
                    src={userImage}
                    alt={member?.fullName || "Member Profile"}
                    width={50}
                    height={50}
                    unoptimized
                    className="h-12 w-12 rounded-full border-2 border-blue-600 object-cover"
                />

                <div>
                    <h4 className="text-base font-bold capitalize md:text-lg">
                        {member?.fullName || "Unknown User"}
                    </h4>
                    <p className="text-xs text-slate-500 md:text-sm">
                        {member?.fullNumber || "No Phone Number"}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    member?.isActive 
                        ? "bg-green-500/15 text-green-400" 
                        : "bg-red-500/15 text-red-400"
                }`}>
                    {member?.isActive ? "Active" : "Inactive"}
                </span>

                <Link
                    href={`/profile/${member?.id || ''}`} 
                    className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 md:text-sm"
                >
                    View
                </Link>
            </div>
        </div>
    )
}