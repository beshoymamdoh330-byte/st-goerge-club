// 


"use client"
import React, { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
    HouseDoorFill, 
    CreditCard2FrontFill, 
    Speedometer2,
    BoxArrowRight 
} from 'react-bootstrap-icons'
import { useFormContext, useThemeContext } from '../assets/contexts'

// 1️⃣ متتبع أحداث الـ Auth والـ Storage
const subscribe = (callback: () => void) => {
    window.addEventListener("auth-change", callback)
    window.addEventListener("storage", callback)
    return () => {
        window.removeEventListener("auth-change", callback)
        window.removeEventListener("storage", callback)
    }
}

// 2️⃣ قراءة القيمة من LocalStorage
const getRoleSnapshot = () => {
    return localStorage.getItem("userRole")
}

// 3️⃣ القيمة الافتراضية للـ Server Side Rendering
const getServerSnapshot = () => null

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { setForm } = useFormContext()
    const { theme, setTheme } = useThemeContext()

    // 🚀 القراءة المباشرة مع التحديث الفوري والتتبع
    const userRole = useSyncExternalStore(subscribe, getRoleSnapshot, getServerSnapshot)
    const isDark = theme === "dark"

    // 👑 التحقق من رتبة Admin
    const isAdmin = userRole ? userRole.toLowerCase().includes("admin") : false

    // 🛑 الشروط المطلوبة لإخفاء السايدبار:
    // 1. إذا كنا في الصفحة الرئيسية '/'
    // 2. أو إذا كان المستخدم ليس أدمن (!isAdmin)
    if (pathname === '/' || !isAdmin) {
        return null
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")

        // إشعار السايدبار للتحديث التلقائي
        window.dispatchEvent(new Event("auth-change"))

        if (setForm) setForm("/")
        router.push("/")
    }

    const navItems = [
        { label: 'الصفحة الرئيسية', href: '/welcome', icon: <HouseDoorFill className="text-xl" /> },
        { label: 'الاشتراكات', href: '/subs', icon: <CreditCard2FrontFill className="text-xl" /> },
    ]

    return (
        <aside className={`w-full p-3 shadow-sm z-50 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r ${
            isDark ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
        }`}>
            <div className="flex min-h-full flex-col justify-start gap-4">
                {/* 🔹 اللوجو */}
                <div className={`flex items-center gap-3 px-2 py-2 border-b ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 shrink-0">
                        s
                    </div>
                    <span className="font-bold text-lg tracking-wide text-blue-600">
                        St.George.Club
                    </span>
                </div>

                {/* 🔹 أزرار التحكم العليا */}
                <div className={`space-y-2 border-b pb-4 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                    <button
                        type="button"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition-all duration-200 ${
                            isDark
                                ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
                                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                    >
                        <span>{isDark ? "☀️" : "🌙"}</span>
                        <span>{isDark ? "Light mode" : "Dark mode"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition-all duration-200 ${
                            isDark ? "text-red-400 hover:bg-red-950/30" : "text-red-600 hover:bg-red-50"
                        }`}
                    >
                        <BoxArrowRight className="text-lg" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>

                {/* 🔹 روابط التصفح */}
                <nav className="flex flex-col gap-1.5">
                    {/* 👑 زر لوحة التحكم */}
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200 mb-2 ${
                            pathname.startsWith('/dashboard')
                                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                        }`}
                    >
                        <Speedometer2 className="text-xl" />
                        <span>لوحة التحكم (Admin)</span>
                    </Link>

                    {/* باقي القائمة */}
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}