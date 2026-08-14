// import React from 'react'
// import DashbordPage from '../pages/DashbordPage'
// export default function Dashboard() {
//   return (
//     <div>
//       <DashbordPage/>
//     </div>
//   )
// }

"use client"
export const dynamic = 'force-dynamic'
import DashbordPage from '../pages/DashbordPage' // تأكد من صحة مسار الملف بالنسبة لمشروعك

export default function Page() {
    return <DashbordPage />
}
