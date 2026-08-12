"use client"
import {  useState } from "react"
import { Icon, LockFill , UnlockFill } from "react-bootstrap-icons"
import { SignupUser  } from "../assets/assets"
import { useFormContext , useThemeContext, useUsersContext } from "../assets/contexts"

export default function SignUp() {
    const [type , setType] = useState<string>("password")
    const [Icon , setIcon] = useState<Icon>(LockFill)
    const [confirmType , setConfirmType] = useState<string>("password")
    const [ConfirmIcon , setConfirmIcon] = useState<Icon>(LockFill)
    const {setForm} = useFormContext()
    const {theme} = useThemeContext()
    const {  users ,  setUsers} = useUsersContext()
    const [user , setUser] = useState<SignupUser>({ id:"" ,  confirmPassword:""  , gender:"" , userName:"" , number:"" , image:"" , type:"" , email:"" , password:""})
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
    const handleConfirmType = ()=>{
        if(confirmType === "text"){
            setConfirmType("password") 
            setConfirmIcon(LockFill)
        }
        else{
            setType("text") 
            setConfirmIcon(UnlockFill)
        }
    }
    const handleAddUser = ()=>{
        setUsers([...users , user])
        clearInputs()
    }
    const clearInputs = ()=>{
        setUser({   id:"", confirmPassword:""  , gender:"" , userName:"" , number:"" , image:"" , type:"" , email:"" , password:""})
    }
    return (
        <article className={` ${theme==="light"?" bg-gray-200 text-black":"  text-white bg-gray-800"} w-11/12 border bg-gray-200 border-t-4 border-r-4 border-blue-600 md:w-200 p-3 rounded-2xl`}>
            <h3 className='text-4xl  capitalize text-center  font-bold mb-3  text-blue-600'>create account</h3>
            <form className="grid grid-cols-1  md:grid-cols-2 gap-2">
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
                placeholder='phone number...'
                value={user.number}
                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , number:event.target.value})
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


                <div className="p-3 text-[18px] border rounded-2xl border-blue-600 w-full">
                    <p>Select your favorite food:</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                                <label htmlFor="male">male</label>
                            <input
                                
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                    setUser({...user , gender:event.target.value})
                                }} type="radio" id="male"  value="male" 
                                checked={user.gender === "male"}
                            />
                        </div>
                        <div className="flex items-center gap-2.5">
                                <label htmlFor="female">female</label>
                                <input

                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                    setUser({...user , gender:event.target.value})
                                }} type="radio" id="femalemale"  value="female" 
                                checked={user.gender === "female"}
                                />
                        </div>
                    </div>
                </div>

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



                <div className="relative">
                    <input 
                    className='p-3 text-[18px] border rounded-2xl border-blue-600 w-full mb-2 focus:bg-blue-200'
                    type={confirmType} 
                    placeholder='confirm password...'
                    value={user.confirmPassword}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setUser({...user , confirmPassword:event.target.value})
                }}
                    />
                    <ConfirmIcon onClick={handleConfirmType} className=" absolute right-3 text-[18px] top-1/2 -translate-y-1/2"/>
                </div>

                <button onClick={(e)=>{
                    e.preventDefault()
                    handleAddUser()
                    setForm("login")
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