"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFormContext, useThemeContext } from '../assets/contexts'

export default function HeroSection() {
    const { setForm } = useFormContext()
    const { theme } = useThemeContext()
    const isDark = theme !== "light"

    return (
        <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}>

            {/* HERO CONTENT SECTION */}
            <section className="flex-1 w-full relative px-5 md:px-20 py-12 md:py-20 flex items-center">
                <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12">
                    
                    {/* Left Text Content */}
                    <div className="lg:col-span-7">
                        <div className={`group relative rounded-[32px] border p-8 md:p-10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 ${
                            isDark 
                                ? "border-slate-800/80 bg-slate-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.4)]" 
                                : "border-slate-200/80 bg-white/70 shadow-[0_20px_50px_rgba(37,99,235,0.08)]"
                        }`}>
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
                            
                            <div className="relative z-10 text-right" dir="rtl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-500">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    ST. George Club
                                </span>

                                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-blue-600 tracking-tight">
                                    ST. George Club
                                </h1>

                                <p className={`mt-6 text-xl md:text-2xl font-medium leading-relaxed ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                                    «الرِّيَاضَةَ الْجَسَدِيَّةَ نَافِعَةٌ لِقَلِيل، وَلكِنَّ التَّقْوَى نَافِعَةٌ لِكُلِّ شَيْءٍ»
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <Link
                                        href="#about"
                                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-600/50"
                                    >
                                        قصتنا
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Showcase (عرض الصورة كاملة + حركة صعود وهبوط) */}
                    <div className="lg:col-span-5 relative flex items-center justify-center">
                        {/* وهج ضوئي خلفي */}
                        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl opacity-70 animate-pulse pointer-events-none" />

                        {/* الكارت الذي يحتوي على كلاس الأنيميشن animate-float */}
                        <div className={`relative w-full max-w-[480px] rounded-[36px] border p-3 sm:p-4 backdrop-blur-2xl transition-all duration-500 animate-float ${
                            isDark 
                                ? "border-slate-800 bg-slate-900/40 shadow-[0_25px_60px_rgba(0,0,0,0.5)]" 
                                : "border-blue-100 bg-white/60 shadow-[0_25px_60px_rgba(37,99,235,0.15)]"
                        }`}>
                            
                            {/* حاوية الصورة الكاملة */}
                            <div className={`relative rounded-[28px] overflow-hidden border border-white/20 p-3 flex items-center justify-center ${
                                isDark ? "bg-slate-950/60" : "bg-slate-100/60"
                            }`}>
                                <Image
                                    src="/images/home.png"
                                    alt="ST. George Club Home"
                                    width={600}
                                    height={600}
                                    priority
                                    className="w-full h-auto max-h-[480px] rounded-[20px] object-contain transition-transform duration-700 ease-out hover:scale-105"
                                />
                            </div>

                            {/* شارة طافية أسفل الصورة */}
                            <div className={`absolute -bottom-4 -left-2 sm:-left-4 rounded-2xl border px-4 py-2.5 shadow-xl backdrop-blur-md flex items-center gap-3 ${
                                isDark ? "border-slate-800 bg-slate-900/90 text-white" : "border-slate-100 bg-white/90 text-slate-900"
                            }`}>
                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-xs font-bold">أهلاً بكم في النادي</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}