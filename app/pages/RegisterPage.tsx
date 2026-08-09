"use client"
import React from 'react'
import Login from '../components/Login'
import SignUp from "../components/SignUp"
import { useFormContext } from '../assets/contexts'
export default function RegisterPage() {
    const {form} = useFormContext()


return (
    <main className=' bg-fixed w-full h-screen p-2.5 md:px-10 light-mode flex items-center justify-center'>
        {
            form === "login" ? <Login/> : <SignUp/>
        }
    </main>
)
}
