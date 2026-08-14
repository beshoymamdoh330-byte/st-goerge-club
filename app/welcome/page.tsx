"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { useThemeContext } from '../assets/contexts' // التكيف مع التيم المتوفر في مشروعك
import defaultAvatar from '@/public/images/st-george-killing-dragon.png' // صورة افتراضية في حال عدم وجود صورة

interface DecodedToken {
    id?: string;
    sub?: string;
    name?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
    photoUrl?: string;
    [key: string]: unknown;
}

interface UserData {
    id: string;
    fullName: string;
    photoUrl: string;
}

export default function WelcomePage() {
    const { theme } = useThemeContext()
    const router = useRouter()
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token")
            
            if (!token) {
                router.replace('/login')
                return
            }

            try {
                const decoded = jwtDecode<DecodedToken>(token)
                
                // استخراج الـ ID والاسم من الـ Token
                const userId = decoded.id || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || ""
                const userName = decoded.name || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "المستخدم"

                if (!userId) {
                    router.replace('/login')
                    return
                }

                // جلب بيانات المستخدم كاملة من الـ API لضمان الحصول على أحدث صورة اسم
                const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${userId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    setUser({
                        id: data.id,
                        fullName: data.fullName || userName,
                        photoUrl: data.photoUrl || ""
                    })
                } else {
                    // Fallback في حالة فشل طلب الـ API
                    setUser({
                        id: userId,
                        fullName: userName,
                        photoUrl: decoded.photoUrl || ""
                    })
                }
            } catch (error) {
                console.error("Error loading user data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [router])

    if (loading) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
                <p className="text-xl font-bold text-blue-600 animate-pulse">جاري تحضير حسابك...</p>
            </div>
        )
    }

    return (
        <div className={`w-full min-h-screen flex flex-col justify-between ${theme === "light" ? "light-mode bg-gray-50 text-black" : "dark-mode bg-gray-950 text-white"}`}>
            
            {/* 🔷 HEADER SECTION */}
            <header className={`w-full py-4 px-6 md:px-16 flex justify-between items-center border-b-2 border-blue-600/30 ${theme === "light" ? "bg-white/80" : "bg-gray-900/80"} backdrop-blur-md sticky top-0 z-50`}>
                {/* اسم الحساب بجانب الهيدر */}
                <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-semibold text-gray-400">حساب:</span>
                    <h2 className="text-lg md:text-xl font-bold text-blue-600 capitalize">{user?.fullName}</h2>
                </div>

                {/* صورة البروفايل - عند الضغط تحول لصفحة البروفايل */}
                <Link href={`/profile/${user?.id}`} className="relative group cursor-pointer">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-600 p-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-400">
                        <Image
                            src={user?.photoUrl && user.photoUrl.trim() !== "" ? user.photoUrl : defaultAvatar}
                            alt="Profile Picture"
                            width={56}
                            height={56}
                            unoptimized
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    {/* Tooltip صغير توضيحي عند الـ Hover */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        عرض البروفايل
                    </span>
                </Link>
            </header>

            {/* 🌟 MAIN CONTENT SECTION */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-5 py-12">
                <div className={`max-w-2xl w-full p-8 md:p-12 rounded-3xl border-b-4 border-r-4 border-blue-600 shadow-2xl transition-all ${theme === "light" ? "bg-white text-black shadow-blue-100" : "bg-gray-900 text-white shadow-black/50"}`}>
                    
                    {/* صورة كبيرة كـ Welcome Avatar */}
                    <div className="flex justify-center mb-6">
                        <Link href={`/profile/${user?.id}`}>
                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-blue-600 p-1 cursor-pointer transition-transform duration-300 hover:scale-105">
                                <Image
                                    src={user?.photoUrl && user.photoUrl.trim() !== "" ? user.photoUrl : defaultAvatar}
                                    alt="User Large Avatar"
                                    width={144}
                                    height={144}
                                    unoptimized
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* رسالة الترحيب */}
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        أهلاً بك، <span className="text-blue-600 capitalize">{user?.fullName}</span> 👋
                    </h1>

                    <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
                        تم إنشاء حسابك بنجاح! يمكنك الآن الانضمام وإدارة اشتراكاتك والوصول لكل الميزات المتاحة.
                    </p>

                    {/* أزرار التوجيه السريع */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <Link 
                            href={`/profile/${user?.id}`}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 cursor-pointer text-center shadow-lg shadow-blue-600/30"
                        >
                            الانتقال للبروفايل
                        </Link>
                        
                        <Link 
                            href="/dashboard"
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-center`}
                        >
                            الصفحة الرئيسية
                        </Link>
                    </div>
                </div>
            </main>

            {/* 🔻 FOOTER */}
            <footer className="py-4 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} St. Club - جميع الحقوق محفوظة.
            </footer>
        </div>
    )
}