import React from 'react'
import DashboradSup from './DashboradSup'
export default function DashboardSubs() {
  return (
    <article className='p-3 rounded-2xl mb-2.5 bg-gray-200 border-t-4 border-l-4 border-blue-600'>
        <h3 className='mb-2.5 text-2xl capitalize text-blue-600'> all subs</h3>
        <DashboradSup/>
    </article>
  )
}
