// 


"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFormContext, useThemeContext } from '../assets/contexts'

// استيراد صورة اللوجو (تأكد من صحة المسار حسب مشروك)
import logoImg from '@/public/images/st-george-killing-dragon.png'

export default function HeroSection() {
    const { setForm } = useFormContext()
    const { theme } = useThemeContext()

    return (
        <div className={`w-full min-h-screen flex flex-col ${theme === "light" ? "light-mode text-slate-900" : "dark-mode text-slate-50"}`}>
            
            {/* 🔷 HEADER SECTION */}
            <header className={`w-full border-b px-4 py-4 sm:px-6 md:px-20 ${theme === "light" ? "bg-white/70 border-slate-200 shadow-[0_8px_30px_rgba(37,99,235,0.08)]" : "bg-slate-950/70 border-slate-800 shadow-[0_8px_30px_rgba(15,23,42,0.4)]"} sticky top-0 z-50 flex flex-col gap-3 backdrop-blur-xl transition-all sm:flex-row sm:items-center sm:justify-between`}>
                
                {/* 1️⃣ اللوجو واسم النادي */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-full border-2 border-blue-600 p-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                        <Image 
                            src={logoImg} 
                            alt="ST. George Club Logo" 
                            width={44} 
                            height={44} 
                            className="w-full h-full object-cover rounded-full"
                            priority
                        />
                    </div>
                    <span className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">
                        ST. George Club
                    </span>
                </Link>

                {/* 2️⃣ زراير Login و Sign Up */}
                <div className="flex flex-wrap items-center gap-3">
                    <Link 
                        href="/login" 
                        onClick={() => setForm && setForm("login")}
                        className="rounded-2xl border-2 border-blue-600 bg-white/20 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white md:px-5 md:text-base"
                    >
                        Log In
                    </Link>

                    <Link 
                        href="/register" 
                        onClick={() => setForm && setForm("signup")}
                        className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 md:px-5 md:text-base"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* 🌟 HERO CONTENT SECTION */}
            <section className={`flex-1 w-full relative px-5 md:px-20 py-10 md:py-16 flex items-center justify-center ${theme === "light" ? "" : ""}`}> 
                <div className={`group relative w-full max-w-3xl rounded-[32px] border p-6 md:p-8 shadow-[0_20px_60px_rgba(37,99,235,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(59,130,246,0.25)] animate-[pulse_6s_ease-in-out_infinite] ${theme === "light" ? "border-white/60 bg-white/55 shadow-blue-100/70" : "border-slate-800 bg-slate-900/60 shadow-black/30"}`}>
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-80" />
                    <div className="relative z-10 text-center md:text-left">
                        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                            ST. George Club
                        </span>
                        <h3 className='mt-6 text-4xl md:text-6xl font-black leading-tight text-blue-600'>ST. George Club</h3>
                        <p className={`mt-5 text-lg md:text-2xl leading-relaxed ${theme === "light" ? "text-slate-700" : "text-slate-200"}`}>
                            الرِّيَاضَةَ الْجَسَدِيَّةَ نَافِعَةٌ لِقَلِيل، وَلكِنَّ التَّقْوَى نَافِعَةٌ لِكُلِّ شَيْءٍ
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="#about"
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40"
                            >
                                قصتنا
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}