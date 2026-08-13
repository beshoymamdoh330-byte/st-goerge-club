// "use client"
// "eslint-disable react-hooks/set-state-in-effect "
// import React, {  useEffect, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { memberType } from '../assets/assets'
// import img from "../../public/images/st-george-killing-dragon.png"
// import { jwtDecode } from 'jwt-decode'

// export default function DasboardMember({ member }: { member: memberType }) {
//     const [activToggle, setActiveToggle] = useState<boolean>(member.isActive)
//     const [role, setRole] = useState('');

//     useEffect(()=>{
//         const currentToken = localStorage.getItem("token")
//         if(currentToken){
//             const decoded = jwtDecode(currentToken);
//             setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
//         }
//     } , [])



//     const handleToggleActive = async () => {
//         const nextState = !activToggle

//         setActiveToggle(nextState)

//         try {
//             // 3. إضافة Backticks للرابط
//             const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
//                 method: 'PATCH', // الأفضل كتابتها Capital
//                 headers: {
//                     'Content-Type': 'application/json' 
//                 },
//                 // إرسال القيمة الجديدة المضمونة
//                 body: JSON.stringify({ ...member, isActive: nextState })
//             })

//             if (!response.ok) {
//                 // لو السيرفر ضرب نرجع الـ State زي ما كانت
//                 setActiveToggle(activToggle)
//             }
//         }
//         catch (err) {
//             console.error(err)
//             // إرجاع الـ State الأصلية عند حدوث خطأ في الشبكة
//             setActiveToggle(activToggle)
//         }
//     } 



//     return (
//         <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
//             <Link href={role==="Admin"?`/viewProfile/${member.id}`:"/"}>
//                 <Image 
//                     src={member.image ? member.image : img}
//                     alt='member photo'
//                     width={300}
//                     height={300}
//                     className='w-20 h-20 rounded-full object-cover'
//                 />
//             </Link>

//             <h3 className='text-2xl text-blue-600'>{member.fullName}</h3>
            
//             <h3 className='text-2xl text-blue-600'>
//                 الاشتراك: {activToggle ? "نشط" : "غير نشط"}
//             </h3>

//             {/* تصحيح className للزرار وتغيير اللون والفرز بناءً على activToggle */}
//             <button 
//                 onClick={handleToggleActive} 
//                 className={`p-3 text-white rounded-3xl cursor-pointer transition-colors ${activToggle ? "bg-red-700 hover:bg-red-800" : "bg-green-700 hover:bg-green-800"}`}
//             >
//                 {activToggle ? "إلغاء التفعيل" : "تفعيل"}
//             </button>
//         </div>
//     )
// }



"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { memberType } from '../assets/assets'
import img from "../../public/images/st-george-killing-dragon.png"

interface DecodedToken {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    [key: string]: unknown;
}

export default function DashboardMember({ member }: { member: memberType }) {
    const [activToggle, setActiveToggle] = useState<boolean>(member.isActive)
    const router = useRouter()

    // دالة التوجيه والتحقق من الصلاحية عند الضغط على الصورة مباشرة
    const handleProfileClick = () => {
        const token = localStorage.getItem("token")
        
        // 1. إذا لم يوجد توكن توجه لصفحة الدخول
        if (!token) {
            router.push('/login')
            return
        }

        try {
            // 2. فك التوكن وفحص الرتبة أثناء الضغط
            const decoded: DecodedToken = jwtDecode(token)
            const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

            let isAdmin = false
            if (Array.isArray(roleClaim)) {
                isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
            } else if (typeof roleClaim === 'string') {
                isAdmin = roleClaim.toLowerCase() === 'admin'
            }

            // 3. التوجيه حسب الرتبة
            if (isAdmin) {
                router.push(`/viewProfile/${member.id}`)
            } else {
                router.push('/login')
            }
        } catch (err) {
            console.error("Token parsing error:", err)
            localStorage.removeItem("token")
            router.push('/login')
        }
    }

    const handleToggleActive = async () => {
        const nextState = !activToggle
        setActiveToggle(nextState)

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ ...member, isActive: nextState })
            })

            if (!response.ok) {
                setActiveToggle(activToggle)
            }
        } catch (err) {
            console.error("Toggle active error:", err)
            setActiveToggle(activToggle)
        }
    } 

    return (
        <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
            <div onClick={handleProfileClick} className="cursor-pointer">
                <Image 
                    src={member.image ? member.image : img}
                    alt='member photo'
                    width={80}
                    height={80}
                    className='w-20 h-20 rounded-full object-cover hover:opacity-80 transition-opacity'
                />
            </div>

            <h3 className='text-2xl text-blue-600'>{member.fullName}</h3>
            
            <h3 className='text-2xl text-blue-600'>
                الاشتراك: {activToggle ? "نشط" : "غير نشط"}
            </h3>

            <button 
                onClick={handleToggleActive} 
                className={`p-3 text-white rounded-3xl cursor-pointer transition-colors ${
                    activToggle ? "bg-red-700 hover:bg-red-800" : "bg-green-700 hover:bg-green-800"
                }`}
            >
                {activToggle ? "إلغاء التفعيل" : "تفعيل"}
            </button>
        </div>
    )
}