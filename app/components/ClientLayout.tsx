"use client"
import React, { useSyncExternalStore } from "react"
import Sidebar from "@/app/components/Sidebar"
import { usePathname } from "next/navigation"

// دالة الاشتراك في التغييرات
const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback)
    return () => window.removeEventListener("storage", callback)
}

// قراءة التوكن من الـ Client
const getSnapshot = () => {
    return localStorage.getItem("token")
}

// القيمة الافتراضية للـ Server
const getServerSnapshot = () => null

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // جلب التوكن بأمان
    const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const isLoggedIn = !!token

    // الصفحات التي لا يظهر فيها السايد بار
    const authPages = ["/login", "/signup"]
    const isAuthPage = authPages.includes(pathname)

    return (
        <div className="flex min-h-screen w-full">
            {/* 🔹 السايدبار للـ Users المسجلين فقط */}
            {isLoggedIn && !isAuthPage && <Sidebar />}

            {/* 🔹 المحتوى الرئيسي */}
            <main className="flex-1 w-full p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}