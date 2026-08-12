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
  return (
    <article className={`p-3 ${theme==="light"?" bg-gray-200 text-black":" bg-gray-800 text-white"} rounded-2xl mb-2.5 bg-gray-200 border-t-4 border-l-4 border-blue-600`}>
        <div className="flex justify-between  items-start md:items-center flex-col md:flex-row">
          <h3 className='mb-2.5 text-2xl capitalize text-blue-600'> all subs</h3>
            <div className="relative mb-5 w-full md:w-1/2 ">
              <input type="text"
                placeholder='search sub'
                value={searchValue} 
                onChange={handleChange}
                className=' focus:bg-blue-400 w-full p-3 border border-blue-600 rounded-2xl' 
                />
              <Search className={` absolute top-1/2 right-2.5 -translate-y-1/2 ${searchValue!==""?"block":"hidden"} `} />
            </div>
        </div>
        {plansMap}
        <Link   className='text-center mt-2.5 p-2 capitalize bg-blue-600 inline-block w-full rounded-2xl hover:bg-blue-800' href={"/addsub"}> add new sub </Link>
    </article>
  )
}
