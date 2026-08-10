"use client"
import React, { useState } from 'react'
import { useThemeContext } from '../assets/contexts'
import { NewSub } from '../assets/assets'
import Header from '../components/Header'
export default function AddSubPage() {
    const {theme} = useThemeContext()
    const [sub , setSub] = useState<NewSub>({name:"" , price:0 , daysNum:0 , type:""})
return (
    <>
    <main className={`  ${theme==="light" ?"light-mode":"dark-mode" }  pt-25 flex items-center justify-center w-full bg-fixed p-5  min-h-screen `} >

        <form action="" className= {` grid-cols-1  mb-5 w-11/12 border border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} `}>
        <h3 className='text-center text-blue-600 text-3xl font-semibold mb-5 text-capitalize'>add new subsciption</h3>
        <input  
            value={sub.name}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setSub({...sub , name:e.target.value})
            }}
            placeholder='name'
            className=' focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl' 
            type="text" />
        <input 
            value={sub.price>0?sub.price:""}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setSub({...sub , price:Number(e.target.value)})
            }}
            placeholder='price'
            className=' focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl' 
            type="number"  />
        <input 
            value={sub.daysNum>0?sub.daysNum:""}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setSub({...sub , daysNum:Number(e.target.value)})
            }}
            placeholder='number of days'
            className=' focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl' 
            type="number" />
        <select 
            value={sub.type}
            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
                setSub({...sub ,type:e.target.value })
            }}
            className=' focus:bg-blue-400 w-full mb-5 p-3 border border-blue-600 rounded-2xl' 
>
            <option value="prep">prep</option>
            <option value="prime">prime</option>
            <option value="second">second</option>
        </select>
        <button className='text-center  p-2 capitalize bg-blue-600 inline-block w-full rounded-2xl hover:bg-blue-800'>create new</button>
        </form>

    </main>
    </>
)
}
