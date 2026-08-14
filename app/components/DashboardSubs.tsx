/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useState , useEffect } from 'react'
import DashboradSup from './DashboradSup'
import { Search } from 'react-bootstrap-icons'
import Link from 'next/link'
import { useThemeContext } from '../assets/contexts'
import {  subType } from '../assets/assets'
export default function DashboardSubs() {
  const [searchValue , setSearchValue] = useState<string>("")
  const [allSubs , setAllSubs] = useState<subType[]>([])
  const {theme} =useThemeContext()




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
      getAllPlans()
    }, [])
    
    console.log(allSubs)
    const plansMap = allSubs.map((sub)=>{
      return(
        <DashboradSup key={sub.id} sub={sub} />
      )
    })


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value
    setSearchValue(value)
  }
  const isDark = theme === "dark"

  return (
    <article className={`p-4 rounded-3xl mb-2.5 border backdrop-blur-sm ${
      isDark
        ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.32)]'
        : 'bg-white/90 border-slate-200 text-slate-800 shadow-[0_18px_40px_rgba(148,163,184,0.18)]'
    }`}>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className='text-2xl font-bold capitalize text-blue-600'> all subs</h3>
            <div className="relative w-full md:w-1/2">
              <input type="text"
                placeholder='search sub'
                value={searchValue} 
                onChange={handleChange}
                className={`w-full rounded-2xl border p-3 text-sm outline-none transition-colors ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400'
                    : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                }`} 
                />
              <Search className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${searchValue!==""?"text-blue-600":"text-slate-400"}`} />
            </div>
        </div>
        <div className="space-y-3">{plansMap}</div>
        <Link className='mt-4 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:translate-y-[-1px] hover:shadow-blue-500/40' href={"/addsub"}> add new sub </Link>
    </article>
  )
}
