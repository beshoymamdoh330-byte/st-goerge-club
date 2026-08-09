import React from 'react'

export default function DashboradSup() {
return (
    <div className='p-4 hover:bg-white rounded-2xl border gap-2.5 border-blue-600 mb-2 flex flex-wrap items-center justify-between'>
        <h3 className='text-2xl text-blue-600'> st george </h3>
        <h3 className='text-2xl text-blue-600'> expired at : 30/8  </h3>
        <h3 className='text-2xl text-blue-600'> sub: availabe </h3>
        <button className='p-3 bg-blue-600 rounded-3xl hover:bg-red-600'> remove sibscription </button>
    </div>    
)
}
