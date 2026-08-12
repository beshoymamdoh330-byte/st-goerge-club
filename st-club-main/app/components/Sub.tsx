import React from 'react'
import { PlanType } from '../assets/assets'
import Image from 'next/image'
export default function Sub({plan}:{plan:PlanType}) {
return (
    <div className=' overflow-hidden  bg-gray-200 border border-r-4  border-b-4 border-blue-600 rounded-2xl'>
        <Image 
            src={plan.image}
            alt='img'
            width={300}
            height={300}
            className='w-full h-80 object-cover'
            loading='lazy'
        />
        <div className="p-3">
            <h3 className='text-4xl text-blue-600 mb-2.5 capitalize'>{plan.title}</h3>
            <h3 className='text-4xl text-center text-blue-600 mb-2.5 uppercase'>{plan.price}egp / month</h3>
            <p className='mb-2.5'>{plan.desc}</p>
        </div>
    </div>
)
}
