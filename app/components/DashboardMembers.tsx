"use client"
import Link from 'next/link'
import { useUsersContext } from '../assets/contexts'
import DasboardMember from './DasboardMember'

export default function DashboardMembers() {
    const {users} = useUsersContext()
    const usersMap = users.map((user)=>{
        return(
            <DasboardMember key={user.email} user={user} />
        )
    })
    return (
        <article className='p-3 rounded-2xl mb-2.5 bg-gray-200 border-r-4 border-b-4 border-blue-600'>
            <h3 className='mb-2.5 text-2xl capitalize text-blue-600'> all members</h3>
            {usersMap}
            <Link className='text-center mt-2.5 p-2 capitalize bg-blue-600 inline-block w-full rounded-2xl hover:bg-blue-800' href={"/register"}> add member </Link>
        </article>
    )
}
