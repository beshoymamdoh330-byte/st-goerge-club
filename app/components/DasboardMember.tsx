"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { memberType } from '../assets/assets'
import img from "../../public/images/st-george-killing-dragon.png"

export default function DasboardMember({ member }: { member: memberType }) {
    const [activToggle , setActiveToggle] = useState<boolean>(member.isActive)
    const handleToggleActive = async () => {
        try {
            setActiveToggle(!activToggle)
            await fetch(https://mahinproject.runasp.net/api/User/${member.id}/toggle-active, 
                {  method: 'Patch',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify( {...member ,  isActive: activToggle } )
                }
            )
        }
        catch (err) {
            console.error(err)
        }
    } 
    return (
        <div className='p-4 hover:bg-white rounded-2xl gap-2.5 border border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
            <Link href={/viewProfile/${member.id}}>
                <Image 
                    src={member.image ? member.image : img}
                    alt='img'
                    width={300}
                    height={300}
                    className='w-20 h-20 rounded-full object-cover'
                />
            </Link>
            <h3 className='text-2xl text-blue-600'>{member.fullName}</h3>
            
            {/* عرض نص صريح بدلاً من طباعة البولين مباشرة */}
            <h3 className='text-2xl text-blue-600'>
                الاشتراك: {member.isActive ? "نشط" : "غير نشط"}
            </h3>

            <button  onClick={handleToggleActive} className={p-3 text-white rounded-3xl ${member.isActive ? "bg-green-700" : "bg-red-700"}}>
                {member.isActive ? "إلغاء التفعيل" : "تفعيل"}
            </button>
        </div>
    )
}