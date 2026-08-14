




"use client"
import React, { useSyncExternalStore } from "react"
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation"
import { useThemeContext } from "../assets/contexts"

// دالة مراقبة تغييرات التوكن في storage
const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback)
    return () => window.removeEventListener("storage", callback)
}

const getSnapshot = () => {
    return localStorage.getItem("token")
}

const getServerSnapshot = () => null

export default function Header({ children }: { children?: React.ReactNode }) {
    const pathname = usePathname()
    const { theme, setTheme } = useThemeContext()

    // جلب حالة التسجيل بدون setState داخل Effect
    const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const isLoggedIn = !!token

    // الصفحات التي لا يظهر فيها السايد بار
    const authPages = ["/login", "/signup"]
    const isAuthPage = authPages.includes(pathname)
    const isDark = theme === "dark"

    return (
        <div className={`flex min-h-screen w-full flex-col ${isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"} lg:flex-row`}>
            {/* 🔹 عرض السايدبار فقط للمستخدم المسجل وفي غير صفحات الدخول */}
            {isLoggedIn && !isAuthPage && <Sidebar />}

            {/* 🔹 المحتوى الرئيسي للموقع */}
            <main className={`w-full flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 ${isDark ? "bg-slate-950/90" : "bg-slate-50/90"}`}>
                {children}
            </main>
        </div>
    )
}