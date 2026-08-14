"use client"
import React from 'react'
import Image from 'next/image'
import { useThemeContext } from '../assets/contexts'

// استيراد صورة الكنيسة
import churchBg from '@/public/images/1.jpeg' 

export default function HeroVerseSection() {
    const { theme } = useThemeContext()
    const isDark = theme !== "light"

    return (
        <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 bg-slate-950">
            
            {/* 1️⃣ الخلفية (طبقتان لضمان عرض الصورة كاملة وبشكل أنيق) */}
            <div className="absolute inset-0 z-0">
                {/* طبقة خلفية ضبابية تملأ الشاشة لتجنب أي فراغات خالية */}
                <Image
                    src={churchBg}
                    alt="Background Blur"
                    fill
                    priority
                    className="object-cover opacity-30 blur-2xl scale-110"
                />

                {/* الصورة الرئيسية كاملاً بدون قص (object-contain) */}
                <Image
                    src={churchBg}
                    alt="Church Background Full"
                    fill
                    priority
                    className=" w-full object-center transition-transform duration-1000 ease-out"
                />

                {/* طبقة تغشية وتظليل خفيفة لإبراز النص بوضوح */}
                <div className={`absolute inset-0 ${
                    isDark 
                        ? 'bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80' 
                        : 'bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/60'
                }`} />
            </div>

            {/* 2️⃣ البوكس الزجاجي مع حركة الدخول الجانبية */}
            <div className="relative z-10 w-full max-w-3xl mx-auto text-center animate-[slideInRight_1.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className={`p-8 sm:p-12 md:p-16 rounded-[36px] border backdrop-blur-md shadow-2xl transition-all duration-500 hover:backdrop-blur-lg ${
                    isDark 
                        ? 'bg-slate-900/50 border-white/10 shadow-black/70' 
                        : 'bg-white/20 border-white/30 shadow-blue-950/30'
                }`}>
                    
                    {/* صليب أعلى البوكس */}
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block text-2xl text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                            ✝
                        </span>
                    </div>

                    {/* نص الآية */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-relaxed tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-serif">
                        « مَا أَحْلَى مَسَاكِنَكَ يَا رَبَّ الْجُنُودِ! تَشْتَاقُ بَلْ تَتُوقُ نَفْسِي إِلَى دِيَارِ الرَّبِّ »
                    </h2>

                    {/* شاهد الآية */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <span className="h-[1px] w-12 bg-amber-400/60" />
                        <p className="text-sm sm:text-base font-bold text-amber-300 tracking-wider drop-shadow">
                            ( مز 84 : 1 - 2 )
                        </p>
                        <span className="h-[1px] w-12 bg-amber-400/60" />
                    </div>

                </div>
            </div>

            {/* سهم الإشارة للنزول */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

        </section>
    )
}