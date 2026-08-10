"use client"
import Link from 'next/link'
import { useState } from 'react'
import { signedUsers } from '../assets/assets'
import DasboardMember from './DasboardMember'
import { useFormContext, useThemeContext } from '../assets/contexts'
import { Search } from 'react-bootstrap-icons'

export default function DashboardMembers() {
    const {setForm} = useFormContext()
    const [searchValue , setSearchValue] = useState<string>("")
    const {theme} = useThemeContext()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setSearchValue(value)
    }
    const usersMap = signedUsers.map((user)=>{
        return(
        
                <DasboardMember key={user.id}  user={user} />
        )
    })
    return (
        <article className={`p-3 rounded-2xl mb-2.5 ${theme==="light"?" text-black bg-gray-200":" bg-gray-800 text-white"} border-r-4 border-b-4 border-blue-600`}>
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
            <h3 className='mb-2.5 text-2xl capitalize text-blue-600'> all subs</h3>
            <div className="relative mb-5 w-full md:w-1/2 ">
            <input type="text"
                placeholder='search sub'
                value={searchValue} 
                onChange={handleChange}
                className=' focus:bg-blue-400 w-full p-3 border border-blue-600 rounded-2xl' 
            />
            <Search className={` absolute top-1/2 right-2.5 -translate-y-1/2 ${searchValue!==""?"block":"hidden"} `} />
        </div>
        </div>
            {usersMap}
            <Link onClick={()=>{setForm("signup")}} className='text-center mt-2.5 p-2 capitalize bg-blue-600 inline-block w-full rounded-2xl hover:bg-blue-800' href={"/register"}> add member </Link>
        </article>
    )
}
