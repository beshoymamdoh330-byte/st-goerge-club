"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { memberType } from '@/app/assets/assets'
import DasboardMember from '@/app/components/DasboardMember'
import { useFormContext, useThemeContext } from '@/app/assets/contexts'
import { Search, ArrowRight, PeopleFill } from 'react-bootstrap-icons'

export default function AllMembersPage() {
    const { setForm } = useFormContext()
    const [searchValue, setSearchValue] = useState<string>("")
    const { theme } = useThemeContext()

    const [allUsers, setAllUsers] = useState<memberType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        let isMounted = true

        const fetchUsers = async () => {
            try {
                setIsLoading(true)

                const token = typeof window !== 'undefined' 
                    ? (localStorage.getItem("token") || localStorage.getItem("userToken") || sessionStorage.getItem("token"))
                    : null

                const headers: HeadersInit = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }

                if (token) {
                    headers["Authorization"] = `Bearer ${token}`
                }

                const response = await fetch("https://mahinproject.runasp.net/api/User/get-all-user", {
                    method: "GET",
                    headers: headers,
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("غير مصرح: يرجى تسجيل الدخول أولاً (401)")
                    }
                    throw new Error(`خطأ في جلب البيانات (${response.status})`)
                }

                const rawData = await response.json()

                let usersArray: any[] = []
                if (Array.isArray(rawData)) {
                    usersArray = rawData
                } else if (rawData && typeof rawData === 'object') {
                    if (Array.isArray(rawData.data)) usersArray = rawData.data
                    else if (Array.isArray(rawData.result)) usersArray = rawData.result
                    else if (Array.isArray(rawData.users)) usersArray = rawData.users
                    else if (Array.isArray(rawData.$values)) usersArray = rawData.$values
                }

                const mappedUsers: memberType[] = usersArray.map((u: any, index: number) => ({
                    id: String(u.id || u.userId || index),
                    fullName: u.fullName || u.name || u.userName || (u.firstName ? `${u.firstName || ''} ${u.lastName || ''}`.trim() : "عضو بدون اسم"),
                    fullNumber: u.phoneNumber || u.fullNumber || u.phone || u.mobile || "بدون رقم",
                    image: u.photoUrl || u.image || u.avatar || u.imageUrl || "",
                    role: u.role || u.userRole || "User",
                    isActive: u.isActive ?? true
                }))

                if (isMounted) {
                    setAllUsers(mappedUsers)
                    setErrorMessage("")
                    setIsLoading(false)
                }
            } catch (err: any) {
                if (isMounted) {
                    console.error("Error fetching users:", err)
                    setErrorMessage(err?.message || "تعذر الاتصال بالسيرفر")
                    setIsLoading(false)
                }
            }
        }

        fetchUsers()

        return () => {
            isMounted = false
        }
    }, [])

    const filteredUsers = allUsers.filter((user) => {
        const query = searchValue.toLowerCase().trim()
        return (
            (user.fullName && user.fullName.toLowerCase().includes(query)) ||
            (user.fullNumber && user.fullNumber.includes(query))
        )
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
                            <PeopleFill size={26} className="text-blue-600" />
                            <div>
                                <h2 className='text-2xl md:text-3xl font-bold text-blue-600'>قائمة الأعضاء ({filteredUsers.length})</h2>
                                <p className="text-xs text-slate-500">عرض جميع حسابات الأعضاء المسجلين</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        onClick={() => setForm && setForm("signup")}
                        className='rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40'
                        href={"/register"}
                    >
                        + إضافة عضو جديد
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full mb-6">
                    <input
                        type="text"
                        placeholder='ابحث بالاسم أو رقم الهاتف...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-full rounded-2xl border p-3.5 pr-10 text-sm outline-none transition-colors ${
                            isDark
                                ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400 focus:border-blue-500'
                                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
                        }`}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="py-12 text-center font-bold text-blue-600 animate-pulse">
                        جاري تحميل قائمة الأعضاء...
                    </div>
                ) : errorMessage ? (
                    <div className="rounded-2xl bg-red-500/10 p-6 text-center font-semibold text-red-500 border border-red-500/20">
                        {errorMessage}
                    </div>
                ) : filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredUsers.map((member) => (
                            <DasboardMember key={member.id} member={member} />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-500 font-medium">
                        لا يوجد أعضاء يطابقون بحثك.
                    </div>
                )}
            </article>
        </main>
    )
}