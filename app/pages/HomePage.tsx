"use client"
import React from 'react'
import About from '../components/About'
import HeroSection from '../components/HeroSection'
import { useThemeContext } from '../assets/contexts'
export default function HomePage() {
    const {theme} = useThemeContext()
return (
    <>
    <main className={`w-full bg-fixed  min-h-screen ${theme==="light"?"light-mode":"dark-mode"}`}>
        <HeroSection/>
        <About/>
    </main>
    </>
)
}
