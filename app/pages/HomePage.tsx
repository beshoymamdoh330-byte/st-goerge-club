"use client"
import React from 'react'
import HeroSection from '../components/HeroSection'
import Header from '../components/Header'
import { useThemeContext } from '../assets/contexts'
export default function HomePage() {
    const {theme} = useThemeContext()
return (
    <>
    <main className={`w-full bg-fixed  h-screen ${theme==="light"?"light-mode":"dark-mode"}`}>
        <HeroSection/>
    </main>
    </>
)
}
