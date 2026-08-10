"use client"
import React, {  useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignupUser } from '../assets/assets'
import img from "../../public/images/images.png"
export default function DasboardMember({user}:{user:SignupUser}) {
    const [isActive , setIsActive]= useState<boolean>(false)
    const [activeState , setActiveState] = useState<string>("activate member")
    const [activeType , setActiveType] = useState<string>("pending")
    const handleActivation =()=>{
        if(isActive){
            setIsActive(false)
            setActiveState("diactivated")
            setActiveType("pending")
        }
        else{
            setIsActive(true)
            setActiveState("activated")
            setActiveType("avialable")
        }
    }
    return (
        <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
            <Link  href={`/viewProfile/${user.id}`}>
            
            <Image 
                src={user.image?user.image:img}
                alt='img'
                width={300}
                height={300}
                className='w-20 h-20 rounded-full object-cover  '
            />
            </Link>
            <h3 className='text-2xl text-blue-600'> {user.userName}  </h3>
            <h3 className='text-2xl text-blue-600'> sub: {activeType} </h3>
            <button onClick={handleActivation} className={`p-3 bg-blue-600 rounded-3xl  ${isActive?"bg-green-700":"bg-red-700"}`}> {activeState}  </button>
        </div>
    )
}
