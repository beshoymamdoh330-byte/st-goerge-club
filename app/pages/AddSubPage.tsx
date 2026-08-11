"use client"
import React, { useState } from 'react'
import { useThemeContext } from '../assets/contexts'
import { NewSub } from '../assets/assets'

export default function AddSubPage() {
    const { theme } = useThemeContext()
    const [sub, setSub] = useState<NewSub>({ 
        name: "", 
        price: 0, 
        durationInDays: 0, 
        targetAgeGroup: 1 
    })

    const handleAddSub = async (e: React.FormEvent) => {
        e.preventDefault() 

        try {
            const response = await fetch("https://mahinproject.runasp.net/api/Subscription/craete-plan", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sub)
            })
            const result = await response.json()
            console.log("Success:", result)
        } catch (error) {
            console.error("Error creating plan:", error)
        }
    }

    return (
        <main className={`${theme === "light" ? "light-mode" : "dark-mode"} pt-25 flex items-center justify-center w-full bg-fixed p-5 min-h-screen`}>
            <form onSubmit={handleAddSub} className={`grid grid-cols-1 mb-5 w-11/12 border border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}>
                <h3 className='text-center text-blue-600 text-3xl font-semibold mb-5 capitalize'>add new subscription</h3>
                
                <input  
                    value={sub.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSub({ ...sub, name: e.target.value })}
                    placeholder='name'
                    className='focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl text-black' 
                    type="text" 
                    required
                />

                <input 
                    value={sub.price > 0 ? sub.price : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSub({ ...sub, price: Number(e.target.value) })}
                    placeholder='price'
                    className='focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl text-black' 
                    type="number" 
                    required
                />

                <input 
                    value={sub.durationInDays > 0 ? sub.durationInDays : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSub({ ...sub, durationInDays: Number(e.target.value) })}
                    placeholder='number of days'
                    className='focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl text-black' 
                    type="number" 
                    required
                />

                <select 
                    value={sub.targetAgeGroup}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSub({ ...sub, targetAgeGroup: Number(e.target.value) })}
                    className='focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl text-black' 
                >
                    <option value={1}>prep</option>
                    <option value={2}>prime</option>
                    <option value={3}>second</option>
                </select>

                <button  onClick={handleAddSub}  className='text-center p-3 capitalize bg-blue-600 text-white inline-block w-full rounded-2xl hover:bg-blue-800 transition-colors'>
                    create new
                </button>
            </form>
        </main>
    )
}