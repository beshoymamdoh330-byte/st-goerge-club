export interface LoginUser {
    email:string , 
    password: string,
}

export interface SignupUser {
    id:string
    userName:string,
    email: string , 
    number:string , 
    password:string,
    image:string ,
    type:string ,
    gender:string , 
    confirmPassword:string
}

export const signedUsers:SignupUser[] = [
    {
        id:"1" , 
        userName:"kero",
        email:"kero@mail.com",
        number:"151515",
        password:"1215",
        image:"/images/st-george-killing-dragon.png",
        type:"prep" , 
        gender:"male",
        confirmPassword:"1235"
    }
]
// 

export interface NewUser {
    name:string , 
    email:string ,
    password:string,
    type:string
} 

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

//plan

export interface PlanType{
    id:string, 
    title:string,
    image:string , 
    desc:string , 
    price:number
}

export const plans:PlanType[] = [
    {
        id:"1",
        title:"first",
        image:"/images/st-george-killing-dragon.png",
        desc:"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        price:200
    } ,
        {
        id:"2",
        title:"first",
        image:"/images/st-george-killing-dragon.png",
        desc:"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        price:200
    },
        {
        id:"3",
        title:"first",
        image:"/images/st-george-killing-dragon.png",
        desc:"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        price:200
    },
        {
        id:"4",
        title:"first",
        image:"/images/st-george-killing-dragon.png",
        desc:"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        price:200
    }
]

export interface NewSub {
    id?:string , 
    name:string,
    price:number,
    daysNum:number,
    type:string
}