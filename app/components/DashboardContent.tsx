import React from 'react'
import { PeopleFill , CashCoin , CardChecklist } from 'react-bootstrap-icons'
export default function DashboardContent() {
return (
    <article className='grid grid-cols-1 mb-5 md:grid-cols-4 gap-2.5'>
        <article className='p-3 rounded-2xl border-r-4 border-b-4 bg-gray-200 border-blue-600 '>
            <div className="flex text-2xl mb-2.5 items-center justify-between">
                <h3 >total members</h3>
                <PeopleFill />
            </div>
            <p className="text-2xl text-blue-600">150</p>
        </article>
        <article className='p-3 rounded-2xl  border-r-4 border-b-4 bg-gray-200 border-blue-600'>
            <div className="flex items-center text-2xl mb-2.5 justify-between">
                <h3>total subs</h3>
                <CardChecklist />
            </div>
            <p className="text-2xl text-blue-600">100</p>
        </article>
        <article className='p-3 rounded-2xl border-r-4 border-b-4 bg-gray-200 border-blue-600 '>
            <div className="flex text-2xl mb-2.5 items-center justify-between">
                <h3 >earns per month</h3>
                <CashCoin/>
            </div>
            <p className="text-2xl text-blue-600">3000 EGP</p>
        </article>
        <article className='p-3 rounded-2xl  border-r-4 border-b-4 bg-gray-200 border-blue-600'>
            <div className="flex items-center text-2xl mb-2.5 justify-between">
                <h3> earns per year</h3>
                <CashCoin/>
            </div>
            <p className="text-2xl text-blue-600">36000 EGP</p>
        </article>
    </article>
)
}
