"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, CardChecklist } from 'react-bootstrap-icons'
import DashboradSup from '@/app/components/DashboradSup' // تأكد من مسار الاستيراد الصحيح
import { useThemeContext } from '@/app/assets/contexts'
import { subType } from '@/app/assets/assets'

export default function AllSubsPage() {
    const [searchValue, setSearchValue] = useState<string>("")
    const [allSubs, setAllSubs] = useState<subType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { theme } = useThemeContext()

    useEffect(() => {
        let isMounted = true

        const getAllPlans = async () => {
            try {
                setIsLoading(true)
                const response = await fetch("https://mahinproject.runasp.net/api/Subscription/get-all-plans")
                
                if (response.ok) {
                    const results = await response.json()
                    // معالجة البيانات أياً كان شكلها القادم من الـ API
                    let subsArray: subType[] = []
                    if (Array.isArray(results)) subsArray = results
                    else if (results?.data) subsArray = results.data
                    else if (results?.$values) subsArray = results.$values

                    if (isMounted) {
                        setAllSubs(subsArray)
                        setIsLoading(false)
                    }
                }
            } catch (err) {
                console.error("Error fetching subs:", err)
                if (isMounted) setIsLoading(false)
            }
        }

        getAllPlans()

        return () => { isMounted = false }
    }, [])

    // تفعيل خاصية البحث (الفلترة)
    const filteredSubs = allSubs.filter((sub: any) => {
        const query = searchValue.toLowerCase().trim()
        // افتراض أن خطة الاشتراك تحتوي على name أو title 
        const subName = sub.name || sub.title || ""
        return subName.toLowerCase().includes(query)
    })

    const isDark = theme === "dark"

    return (
        <main className={`min-h-screen py-10 pt-28 px-4 md:px-16 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <article className={`p-6 rounded-3xl border backdrop-blur-sm max-w-6xl mx-auto ${
                isDark
                    ? 'bg-slate-900/90 border-slate-800 shadow-2xl'
                    : 'bg-white/95 border-slate-200 shadow-xl'
            }`}>
                
                {/* Header & Back Button */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="p-2.5 rounded-2xl bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                            <ArrowRight size={20} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <CardChecklist size={26} className="text-blue-600" />
                            <div>
                                <h2 className='text-2xl md:text-3xl font-bold text-blue-600 capitalize'>All Subscriptions ({filteredSubs.length})</h2>
                                <p className="text-xs text-slate-500">Manage and view all subscription plans</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        className='rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40'
                        href={"/addsub"}
                    >
                        + Add New Sub
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full mb-6">
                    <input
                        type="text"
                        placeholder='Search sub...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-full rounded-2xl border p-3.5 pr-10 text-sm outline-none transition-colors ${
                            isDark
                                ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400 focus:border-blue-500'
                                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
                        }`}
                    />
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${searchValue !== "" ? "text-blue-600" : "text-slate-400"}`} size={18} />
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="py-12 text-center font-bold text-blue-600 animate-pulse">
                        Loading subscriptions...
                    </div>
                ) : filteredSubs.length > 0 ? (
                    <div className="space-y-3">
                        {filteredSubs.map((sub) => (
                            <DashboradSup key={sub.id} sub={sub} />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-500 font-medium">
                        No subscriptions found.
                    </div>
                )}
            </article>
        </main>
    )
}