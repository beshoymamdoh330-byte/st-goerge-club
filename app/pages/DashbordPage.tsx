import React from 'react'
import DashboardContent from '../components/DashboardContent'
import DashboardMembers from '../components/DashboardMembers'
import DashboardSubs from '../components/DashboardSubs'
export default function DashbordPage() {
return (
    <main className='w-full bg-fixed p-5 light-mode min-h-screen ' >
        <DashboardContent/>
        <section className='grid grid-cols-1  items-start md:grid-cols-2 gap-2.5'>
            <DashboardMembers/>
            <DashboardSubs/>
        </section>
    </main>
)
}
