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

// users context
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
    const [users , setUsers] = useState<SignupUser[]>([])
    return(
        <UsersContext.Provider value={{users , setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}
//toggle theme context

interface themeTypeContext {
    theme: string , 
    setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<themeTypeContext | null>(null)

export const useThemeContext = ()=>{
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error ("theme provider")
    }
    return context 
}

export const ThemeProvider = ({children}: {children:ReactNode})=>{
    const [theme , setTheme] = useState<string>("light")
    return(
        <ThemeContext.Provider value={{theme , setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
