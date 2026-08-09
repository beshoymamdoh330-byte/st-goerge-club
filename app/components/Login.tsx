"use client"
import { useState } from "react"
import { Icon, LockFill , UnlockFill } from "react-bootstrap-icons"
import { LoginUser } from "../assets/assets"
import { useFormContext } from "../assets/contexts"

export default function Login() {
    const [type , setType] = useState<string>("password")
    const [Icon , setIcon] = useState<Icon>(LockFill)
    const [user , setUser] = useState<LoginUser>({   email:"" , password:""})
    const {setForm} = useFormContext()
    const handleType = ()=>{
        if(type === "text"){
            setType("password") 
            setIcon(LockFill)
        }
        else{
            setType("text") 
            setIcon(UnlockFill)
        }
    }
    return (
        <article className=' w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl'>
            <h3 className='text-4xl  capitalize text-center  font-bold mb-3  text-blue-600'>login</h3>
            <form action="">
                <input 
                className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                type="email" 
                placeholder='email address...'
                value={user.email}
                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , email:event.target.value})
                }}
                />
                <div className="relative">
                    <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200'
                    type={type} 
                    placeholder='password...'
                    value={user.password}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , password:event.target.value})
                }}
                    />
                    
                    <Icon onClick={handleType} className=" absolute right-3 text-[18px] top-1/2 -translate-y-1/2"/>
                </div>
                <button className='p-3 text-[20px]  rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900'>login</button>
                <div className="flex justify-between items-center">
                    <p className='capitalize'>no account </p>
                    <a href="#" onClick={()=>{
                        setForm("signup")
                    }} className=' capitalize hover:underline'>sign up</a>
                </div>
            </form>
        </article>
)
}
