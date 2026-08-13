"use client"
import React, {  useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { memberType } from '../assets/assets'
import img from "../../public/images/st-george-killing-dragon.png"
import { jwtDecode } from 'jwt-decode'

export default function DasboardMember({ member }: { member: memberType }) {
    const [activToggle, setActiveToggle] = useState<boolean>(member.isActive)
    const [role, setRole] = useState('');

useEffect(() => {
    const currentToken = localStorage.getItem("token")
    
    if (currentToken) {
        try {
            const decoded: any = jwtDecode(currentToken)
            const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

            // التأكد مما إذا كانت الرتبة مصفوفة (Multiple Roles) أم نص عادي
            if (Array.isArray(roleClaim)) {
                // يمكنك حفظ كل الأدوار أو التحقق لو كان بينها "admin"
                setRole(roleClaim.includes("admin") ? "admin" : roleClaim[0])
            } else {
                setRole(roleClaim)
            }
        } catch (error) {
            console.error("Invalid token:", error)
            // في حالة التوكن التالف، يفضل مسحه من localStorage
            localStorage.removeItem("token")
        }
    }
}, [])



    const handleToggleActive = async () => {
        const nextState = !activToggle

        setActiveToggle(nextState)

        try {
            // 3. إضافة Backticks للرابط
            const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
                method: 'PATCH', // الأفضل كتابتها Capital
                headers: {
                    'Content-Type': 'application/json' 
                },
                // إرسال القيمة الجديدة المضمونة
                body: JSON.stringify({ ...member, isActive: nextState })
            })

            if (!response.ok) {
                // لو السيرفر ضرب نرجع الـ State زي ما كانت
                setActiveToggle(activToggle)
            }
        }
        catch (err) {
            console.error(err)
            // إرجاع الـ State الأصلية عند حدوث خطأ في الشبكة
            setActiveToggle(activToggle)
        }
    } 



    return (
        <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
            <Link href={role==="Admin"?`/viewProfile/${member.id}`:"/"}>
                <Image 
                    src={member.image ? member.image : img}
                    alt='member photo'
                    width={300}
                    height={300}
                    className='w-20 h-20 rounded-full object-cover'
                />
            </Link>

            <h3 className='text-2xl text-blue-600'>{member.fullName}</h3>
            
            <h3 className='text-2xl text-blue-600'>
                الاشتراك: {activToggle ? "نشط" : "غير نشط"}
            </h3>

            {/* تصحيح className للزرار وتغيير اللون والفرز بناءً على activToggle */}
            <button 
                onClick={handleToggleActive} 
                className={`p-3 text-white rounded-3xl cursor-pointer transition-colors ${activToggle ? "bg-red-700 hover:bg-red-800" : "bg-green-700 hover:bg-green-800"}`}
            >
                {activToggle ? "إلغاء التفعيل" : "تفعيل"}
            </button>
        </div>
    )
}