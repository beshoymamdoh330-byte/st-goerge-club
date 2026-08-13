"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { memberType } from '../assets/assets'
import img from "../../public/images/st-george-killing-dragon.png"

interface DecodedToken {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    [key: string]: any;
}

export default function DashboardMember({ member }: { member: memberType }) {
    const [isActiveToggle, setIsActiveToggle] = useState<boolean>(member.isActive)
    const router = useRouter()

    // دالة فحص الصلاحيات عند الضغط على صورة العضو
    const handleProfileClick = () => {
        const token = localStorage.getItem("token")

        // 1. لو مفيش توكن يروح للـ login
        if (!token) {
            router.push('/login')
            return
        }

        try {
            const decoded: DecodedToken = jwtDecode(token)
            const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

            let isAdmin = false
            if (Array.isArray(roleClaim)) {
                isAdmin = roleClaim.some(r => r.toLowerCase() === 'admin')
            } else if (typeof roleClaim === 'string') {
                isAdmin = roleClaim.toLowerCase() === 'admin'
            }

            // 2. لو أدمن يفتح صفحة البروفايل، غير كده يروح للـ login
            if (isAdmin) {
                router.push(`/viewProfile/${member.id}`)
            } else {
                router.push('/login')
            }
        } catch (error) {
            console.error("Token decoding error:", error)
            localStorage.removeItem("token")
            router.push('/login')
        }
    }

    const handleToggleActive = async () => {
        const previousState = isActiveToggle
        const nextState = !isActiveToggle

        setIsActiveToggle(nextState)

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...member, isActive: nextState })
            })

            if (!response.ok) {
                setIsActiveToggle(previousState)
            }
        } catch (err) {
            console.error('Error toggling status:', err)
            setIsActiveToggle(previousState)
        }
    } 

    return (
        <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
            {/* الضغط على الصورة ينفذ دالة التوجيه والتحقق */}
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
                الاشتراك: {isActiveToggle ? "نشط" : "غير نشط"}
            </h3>

            <button 
                onClick={handleToggleActive} 
                className={`p-3 text-white rounded-3xl cursor-pointer transition-colors ${
                    isActiveToggle ? "bg-red-700 hover:bg-red-800" : "bg-green-700 hover:bg-green-800"
                }`}
            >
                {isActiveToggle ? "إلغاء التفعيل" : "تفعيل"}
            </button>
        </div>
    )
}