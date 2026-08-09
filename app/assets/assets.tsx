export interface LoginUser {
    email:string , 
    password: string,
}

export interface SignupUser {
    id?:string
    userName:string,
    email: string , 
    age:string , 
    password:string,
    image:string ,
    type:string
}


// 

export interface memberType {
    id:string , 
    image:string , 
    name:string , 
    active:false ,
    type:boolean
}
export interface subType {
    id:string , 
    image:string , 
    name:string , 
    active:false , 
    type:boolean , 
    date: Date
}