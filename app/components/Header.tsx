/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon, MoonFill , BrightnessHighFill } from 'react-bootstrap-icons'
import { useThemeContext } from '../assets/contexts'
export default function Header() {
    const [activeScroll , setActiveScroll] = useState<boolean>(false)
    const { theme , setTheme} = useThemeContext()
    const [ThemeIcon , setThemeIcon] = useState<Icon>(MoonFill)

    const handleToggleTheme = ()=>{
        if(theme === "light"){
            setTheme("dark")
            localStorage.setItem("theme" , "dark")
            setThemeIcon(BrightnessHighFill)
        }
        else{
            setTheme("light")
            localStorage.setItem("theme" , "light")
            setThemeIcon(MoonFill)
        }
    }

    useEffect(()=>{
        const currentTheme = localStorage.getItem("theme")
        if(currentTheme === "dark"){
            setTheme("dark")
            setThemeIcon(BrightnessHighFill)
        }else{
            setTheme("light")
            setThemeIcon(MoonFill)
        }
    } , [setTheme])

    const handleScroll = ()=>{
        if(window.scrollY>50){
            setActiveScroll(true)
        }
        else{
            setActiveScroll(false)
        }
    }
        useEffect(()=>{
        window.addEventListener("scroll" , handleScroll)
        return()=>{
            window.removeEventListener("scroll" ,handleScroll )
        }
    } , [])
return (
    <header className={`   ${theme==="light"?"text-black":"text-white"} ${activeScroll?"bg-black/5 backdrop-blur-md":""} w-full h-20 px-5 md:px-20 text-[20px] fixed text-black flex items-center justify-between top-0 left-0 z-10`}>
        <h3>logo</h3>
        <ul className='flex items-center gap-3'>
            <li>
                <Link className='hover:text-blue-600 capitalize' href={"/"}>home</Link>
            </li>
            <li>
                <Link className='hover:text-blue-600 capitalize' href={"/subs"}>subs</Link>
            </li>
        </ul>
        <div className="flex items-center gap-3">
            <Link className='px-5 py-2.5 capitalize bg-blue-600 hover:bg-blue-800 rounded-3xl' href={"/register"}>register</Link>
            <ThemeIcon  onClick={handleToggleTheme} className='hover:text-blue-600 text-2xl' />
        </div>
    </header>
)
}
