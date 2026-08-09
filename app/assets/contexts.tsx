// change form context
"use client"

import { SignupUser } from "./assets"
import { Dispatch, SetStateAction , createContext, useContext , ReactNode, useState } from "react"
// import { SignupUser } from "./assets"
interface formTypeContext {
    form: string , 
    setForm: Dispatch<SetStateAction<string>>
}

const FormContext = createContext<formTypeContext | null>(null)

export const useFormContext = ()=>{
    const context = useContext(FormContext)
    if(!context){
        throw new Error ("form provider")
    }
    return context 
}

export const FormProvider = ({children}: {children:ReactNode})=>{
    const [form , setForm] = useState<string>("login")
    return(
        <FormContext.Provider value={{form , setForm}}>
            {children}
        </FormContext.Provider>
    )
}

interface usersTypeContext {
    users: SignupUser[] , 
    setUsers: Dispatch<SetStateAction<SignupUser[]>>
}

const UsersContext = createContext<usersTypeContext | null>(null)

export const useUsersContext = ()=>{
    const context = useContext(UsersContext)
    if(!context){
        throw new Error ("form provider")
    }
    return context 
}

export const UsersProvider = ({children}: {children:ReactNode})=>{
    const [users , setUsers] = useState<SignupUser[]>([
        {
        id:"1",
        userName:"st george" , 
        email:"stgeorge@mail.com",
        age:"20",
        type:"pending",
        image:  "/images/images.png" ,
        password:"1234"
    }
    ])
    return(
        <UsersContext.Provider value={{users , setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}