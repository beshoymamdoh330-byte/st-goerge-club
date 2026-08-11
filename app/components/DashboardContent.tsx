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
return (
    <article className='grid grid-cols-1 mb-5 md:grid-cols-4 gap-2.5'>
        <article className={`   ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} p-3 rounded-2xl border-r-4 border-b-4  border-blue-600 `}>
            <div className="flex text-2xl mb-2.5 items-center justify-between">
                <h3 >total members</h3>
                <PeopleFill />
            </div>
            <p className="text-2xl text-blue-600"> {allUsers.length} </p>
        </article>
        <article className={`   ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} p-3 rounded-2xl border-r-4 border-b-4  border-blue-600 `}>
            <div className="flex items-center text-2xl mb-2.5 justify-between">
                <h3>total subs</h3>
                <CardChecklist />
            </div>
            <p className="text-2xl text-blue-600">{allSubs.length}</p>
        </article>
        <article className={`   ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} p-3 rounded-2xl border-r-4 border-b-4  border-blue-600 `}>
            <div className="flex text-2xl mb-2.5 items-center justify-between">
                <h3 >earns per month</h3>
                <CashCoin/>
            </div>
            <p className="text-2xl text-blue-600">3000 EGP</p>
        </article>
        <article className={`   ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} p-3 rounded-2xl border-r-4 border-b-4  border-blue-600 `}>
            <div className="flex items-center text-2xl mb-2.5 justify-between">
                <h3> earns per year</h3>
                <CashCoin/>
            </div>
            <p className="text-2xl text-blue-600">36000 EGP</p>
        </article>
    </article>
)
}
