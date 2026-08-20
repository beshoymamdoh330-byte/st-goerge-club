// // "use client"
// import React from 'react'
// import DashboardContent from '../components/DashboardContent'
// import DashboardMembers from '../components/DashboardMembers'
// import DashboardSubs from '../components/DashboardSubs'
// import { useThemeContext } from '../assets/contexts'

// export default function DashbordPage() {
//     const { theme } = useThemeContext()

//     return (
//         <main className={`${theme === "light" ? "light-mode" : "dark-mode"} w-full bg-fixed p-5 pt-25 min-h-screen`}>
//             {/* محتوى الداشبورد الرئيسي */}
//             <DashboardContent />

//             {/* قسم الأعضاء والاشتراكات */}
//             <section className='grid grid-cols-1 items-start md:grid-cols-2 gap-2.5 mt-5'>
//                 <DashboardMembers />
//                 <DashboardSubs />
//             </section>
//         </main>
//     )
// }

"use client"
import React from 'react'
import DashboardContent from '../components/DashboardContent'
import DashboardMembers from '../components/DashboardMembers'
import DashboardSubs from '../components/DashboardSubs'
import { useThemeContext } from '../assets/contexts'
import DashboardPlayGround from '../components/DashboardPlayGround'

export default function DashbordPage() {
    const { theme } = useThemeContext()

    return (
        <main className={`${theme === "light" ? "light-mode" : "dark-mode"} w-full bg-fixed p-5 pt-25 min-h-screen`}>
            <DashboardContent />
            <section className='grid grid-cols-1 items-start md:grid-cols-2 gap-2.5 mt-5'>
                <DashboardMembers />
                <DashboardSubs />
                <DashboardPlayGround/>
            </section>
        </main>
    )
}