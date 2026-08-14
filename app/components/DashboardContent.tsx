/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import { PeopleFill , CashCoin , CardChecklist } from 'react-bootstrap-icons'
import { useThemeContext } from '../assets/contexts'
import { memberType , subType } from '../assets/assets'
export default function DashboardContent() {

    const [allUsers, setAllUsers] = useState<memberType[]>([])
    const [allSubs , setAllSubs] = useState<subType[]>([])

    const getAllUsers = async () => {
        try{
        const response = await fetch("https://mahinproject.runasp.net/api/User/get-all-user")
        const results = await response.json()
        setAllUsers(results)
        }catch(err){
            console.error(err)
        }
    }

    const getAllPlans = async () => {
        try{
        const response = await fetch("https://mahinproject.runasp.net/api/Subscription/get-all-plans")
        const results = await response.json()
        setAllSubs(results)
        }catch(err){
            console.error(err)
        }
    }


    useEffect(() => {
        getAllUsers()
        getAllPlans()
    }, [])






    const {theme} = useThemeContext()
    const isDark = theme === "dark"
return (
    <article className='grid grid-cols-1 mb-5 md:grid-cols-4 gap-3'>
        {[
            { title: 'total members', value: allUsers.length, icon: <PeopleFill className="text-xl" /> },
            { title: 'total subs', value: allSubs.length, icon: <CardChecklist className="text-xl" /> },
            { title: 'earns per month', value: '3000 EGP', icon: <CashCoin className="text-xl" /> },
            { title: 'earns per year', value: '36000 EGP', icon: <CashCoin className="text-xl" /> }
        ].map((item) => (
            <article
                key={item.title}
                className={`p-4 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                        ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.35)]'
                        : 'bg-white/90 border-slate-200 text-slate-800 shadow-[0_18px_40px_rgba(148,163,184,0.18)]'
                }`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">{item.title}</h3>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-600">
                        {item.icon}
                    </div>
                </div>
                <p className="text-2xl font-black text-blue-600">{item.value}</p>
            </article>
        ))}
    </article>
)
}
