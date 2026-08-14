"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import About from '../components/About'
import { useFormContext, useThemeContext } from '../assets/contexts'
import HeroVerseSection from '../components/HeroVerseSection'
import HeroSection from '../components/HeroSection'

import logoImg from '@/public/images/home.png'

export default function HomePage() {
    const { setForm } = useFormContext()
    const { theme } = useThemeContext()
    const isDark = theme !== "light"

    return (
        <main className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}>

            {/* 🔷 HEADER SECTION (في أصل الصفحة من الأعلى) */}
            <header className={`w-full border-b px-4 py-4 sm:px-6 md:px-20 sticky top-0 z-50 flex flex-col gap-3 backdrop-blur-xl transition-all sm:flex-row sm:items-center sm:justify-between ${
                isDark 
                    ? "bg-slate-950/80 border-slate-800/80 shadow-[0_8px_30px_rgba(15,23,42,0.6)]" 
                    : "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(37,99,235,0.06)]"
            }`}>

                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-full border-2 border-blue-600 p-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-md shadow-blue-500/20">
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

                <div className="flex flex-wrap items-center gap-3">
                    <Link 
                        href="/login" 
                        onClick={() => setForm && setForm("login")}
                        className="rounded-2xl border-2 border-blue-600 bg-blue-600/5 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white md:px-5 md:text-base"
                    >
                        Log In
                    </Link>

                    <Link 
                        href="/register" 
                        onClick={() => setForm && setForm("signup")}
                        className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-600/40 md:px-5 md:text-base"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* 1️⃣ السكشن الأول: خلفية الكنيسة وبوكس الآية بالأنيميشن البطيء */}
            <HeroVerseSection />

            {/* 2️⃣ السكشن الثاني: محتوى النادي */}
            <HeroSection />
            <About />

        </main>
    )
}