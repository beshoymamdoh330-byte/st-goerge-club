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
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80'>
        <div className="min-w-[120px]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">name</p>
            <h3 className='text-xl font-bold text-blue-600'> {sub.name} </h3>
        </div>
        <div className="min-w-[100px]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">price</p>
            <h3 className='text-xl font-bold text-blue-600'> {sub.price} </h3>
        </div>
        <div className="min-w-[120px]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">days</p>
            <h3 className='text-xl font-bold text-blue-600'> {sub.durationInDays} </h3>
        </div>
        <div className="min-w-[120px]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">status</p>
            <h3 className='text-xl font-bold text-blue-600'> {sub.isActive?"yes":"no"} </h3>
        </div>
        <div className="min-w-[120px]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">stage</p>
            <h3 className='text-xl font-bold text-blue-600'> {getStages()} </h3>
        </div>
        <button className='rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600'> remove subscription </button>
    </div>    
)
}
