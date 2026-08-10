"use client"
import React from 'react'
import Link from 'next/link'
import { useFormContext } from '../assets/contexts'

export default function HeroSection() {
    const {setForm} = useFormContext()
return (
    <section className='w-full relative px-2.5 md:px-20 home min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center'> 
    <div>
        <h3 className='text-5xl mb-2 font-bold text-white'> Lorem ipsum dolor sit amet. </h3>
        <p className='text-2xl mb-2 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, doloremque.</p>
        <div className="flex flex-col  md:flex-row gap-2.5">
        <Link className='inline-block py-2.5 px-5 rounded-2xl text-2xl bg-blue-600 hover:bg-blue-800 text-white' href={"/subs"}>book now</Link>
        <Link  onClick={()=>{setForm("signup")}} className='inline-block py-2.5 px-5 rounded-2xl text-2xl bg-blue-800 hover:bg-blue-900 text-white' href={"/register"}>create account</Link>
        </div>
    </div>

    </section>
)
}
