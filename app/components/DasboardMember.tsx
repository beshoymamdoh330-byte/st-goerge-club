// 






"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { memberType } from '../assets/assets'
import { useThemeContext } from '../assets/contexts'
import defaultImg from "../../public/images/st-george-killing-dragon.png"

interface DasboardMemberProps {
    member?: memberType;
}

export default function DasboardMember({ member }: DasboardMemberProps) {
    const { theme } = useThemeContext()
    const isDark = theme === "dark"

    const [isActive, setIsActive] = useState<boolean>(member?.isActive ?? false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsActive(member?.isActive ?? false)
    }, [member?.isActive])

    const handleToggleActive = async () => {
        if (!member?.id || loading) return

        const previousState = isActive
        const nextState = !previousState

        setIsActive(nextState)
        setLoading(true)

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://mahinproject.runasp.net/api/User/${member.id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ isActive: nextState })
            })

            if (!response.ok) {
                setIsActive(previousState)
            }
        } catch (err) {
            console.error("Error toggling status:", err)
            setIsActive(previousState)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`flex flex-col gap-4 rounded-2xl border p-3.5 transition-all duration-300 md:flex-row md:items-center md:justify-between ${
            isDark
                ? "border-slate-800 bg-slate-900/90 text-slate-100 shadow-lg shadow-slate-950/20 hover:border-slate-700"
                : "border-slate-200/80 bg-white text-slate-800 shadow-sm hover:shadow-md hover:border-slate-300"
        }`}>
            {/* معلومات المستخدم */}
            <div className="flex items-center gap-3.5">
                <div className="relative w-13 h-13 flex-shrink-0">
                    <img
                        src={member?.image && member.image.trim() !== "" ? member.image : defaultImg.src}
                        alt={member?.fullName || "Member Profile"}
                        className="w-13 h-13 rounded-full border-2 border-blue-600/30 object-cover shadow-sm"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = defaultImg.src
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <h4 className="text-base font-bold capitalize tracking-tight text-slate-900 dark:text-slate-100 md:text-lg">
                        {member?.fullName || "Unknown User"}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 md:text-sm">
                        {member?.fullNumber || "بدون رقم هاتف"}
                    </p>
                </div>
            </div>

            {/* منطقة الشارة والزراير */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 md:pt-0 md:border-t-0 justify-between md:justify-end">
                
                {/* 1️⃣ شارة الحالة */}
                <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                    isActive 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                }`}>
                    <span className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                    {isActive ? "حساب نشط" : "غير نشط"}
                </div>

                {/* 2️⃣ زرار التفعيل / إلغاء التفعيل */}
                <button
                    onClick={handleToggleActive}
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm md:text-sm cursor-pointer ${
                        isActive
                            ? "bg-rose-600 hover:bg-rose-700 hover:shadow-rose-600/20"
                            : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/20"
                    }`}
                >
                    {loading ? (
                        <>
                            <svg className="h-3.5 w-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span>جاري...</span>
                        </>
                    ) : isActive ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            <span>إلغاء التفعيل</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            <span>تفعيل</span>
                        </>
                    )}
                </button>

                {/* 3️⃣ زرار عرض الملف الشخصي */}
                <Link
                    href={`/profile/${member?.id || ''}`} 
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm md:text-sm ${
                        isDark 
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white" 
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80"
                    }`}
                >
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <span>عرض</span>
                </Link>
            </div>
        </div>
    )
}