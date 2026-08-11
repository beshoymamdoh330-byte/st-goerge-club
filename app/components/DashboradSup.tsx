import React from 'react'
import { subType } from '../assets/assets'

export default function DashboradSup({sub}:{sub:subType}) {
    const getStages = ()=>{
        if(sub.targetAgeGroup === 0){
            return "abt"
        }
        if(sub.targetAgeGroup === 1){
            return "add"
        }
        if(sub.targetAgeGroup === 2){
            return "thn"
        }
        if(sub.targetAgeGroup === 3){
            return "gra"
        }
        if(sub.targetAgeGroup === 4){
            return "gra"
        }
    }
return (
    <div className='p-4 hover:bg-white rounded-2xl border gap-2.5 border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
        <h3 className='text-2xl text-blue-600'> {sub.name} </h3>
        <h3 className='text-2xl text-blue-600'> {sub.price} </h3>
        <h3 className='text-2xl text-blue-600'> {sub.durationInDays}  </h3>
        <h3 className='text-2xl text-blue-600'> sub: {sub.isActive?"yes":"no"} </h3>
        <h3 className='text-2xl text-blue-600'> stage: {getStages()} </h3>
        <button className='p-3 bg-blue-600 rounded-3xl hover:bg-red-600'> remove sibscription </button>
    </div>    
)
}
