"use client"
import {  useState } from "react"
import { Icon, LockFill , UnlockFill } from "react-bootstrap-icons"
import { SignupUser  } from "../assets/assets"
import { useFormContext , useUsersContext } from "../assets/contexts"

export default function SignUp() {
    const [type , setType] = useState<string>("password")
    const [Icon , setIcon] = useState<Icon>(LockFill)
    const {setForm} = useFormContext()
    const {  users ,  setUsers} = useUsersContext()
    const [user , setUser] = useState<SignupUser>({  id:"" ,  userName:"" , age:"" , image:"" , type:"" , email:"" , password:""})
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
    const handleAddUser = ()=>{
        setUsers([...users , user])
        clearInputs()
    }
    const clearInputs = ()=>{
        setUser({   userName:"" , age:"" , image:"" , type:"" , email:"" , password:""})
    }
    return (
        <article className=' w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl'>
            <h3 className='text-4xl  capitalize text-center  font-bold mb-3  text-blue-600'>create account</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                type="text" 
                placeholder='username...'
                value={user.userName}
                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , userName:event.target.value})
                }}
                />

                
                <input 
                className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                type="text" 
                placeholder='age...'
                value={user.age}
                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , age:event.target.value})
                }}
                />


                <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                    type="file" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0]; // Safe navigation for TypeScript
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setUser({ ...user, image: reader.result as string });
                    };
                    reader.readAsDataURL(file); // Starts conversion to base64
                }}
                />

                <div  >
                <label  className="w-full mb-1">Choose a stage:</label>
                <select 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200' 
                    name="cars" 
                    id="cars"
                    value={user.type} // Controls the selected state
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setUser({ ...user, type: event.target.value });
                }}
                >
                <option value="prep">prep</option> 
                <option value="prime">prime</option> 
                <option value="second">second</option> 
                <option value="uni">uni</option> 
                <option value="grads">grads</option> 
                </select>

                </div>
                
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
                <button onClick={(e)=>{
                    e.preventDefault()
                    handleAddUser()
                }}
                    className= 'p-3 text-[20px]   col-span-1 md:col-span-2 rounded-2xl bg-blue-600 w-full mb-2 hover:bg-blue-900'>create account</button>
                <div className="flex justify-between  col-span-1 md:col-span-2 items-center">
                    <p className='capitalize'>have account </p>
                    <a href="#" onClick={()=>{
                        setForm("login")
                    }} className=' capitalize hover:underline'>login</a>
                </div>
            </form>
        </article>
)
}