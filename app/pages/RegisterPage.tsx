"use client"
import React from 'react'
import Login from '../components/Login'
// import SignUp from "../components/SignUp"
import { useFormContext, useThemeContext } from '../assets/contexts'
import Header from '../components/Header'
export default function RegisterPage() {
    const {form} = useFormContext()
    const {theme} = useThemeContext()


return (
    <>
        <Header/>
        <main className={` bg-fixed w-full min-h-screen py-5 pt-25  md:px-10 ${theme==="light"?"light-mode":"dark-mode"} flex items-center justify-center`}>
            {/* {
                form === "login" ? <Login/> : <SignUp/>
            } */}
            <Login/>
        </main>
    
    </>
)
}
