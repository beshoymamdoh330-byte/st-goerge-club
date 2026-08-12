export interface LoginUser {
    email:string , 
    password: string,
}




// 

export interface NewUser {
    name:string , 
    email:string ,
    password:string,
    type:string
} 

export interface SignupUser {
    id: string;
    fullName?: string;    // إضافة ? تجعلها اختيارية ولن يطالب بها TypeScript
    userName?: string;
    email: string;
    fullNumber?: string;  // إضافة ? تجعلها اختيارية
    number?: string;
    password?: string;
    image: string;
    type: string;
    gender: string;
    confirmPassword?: string;
    isActive?: boolean;
}

export interface memberType {
    id: string;
    image: string;
    fullName: string;
    isActive: boolean;
    fullNumber: string;
}

export interface subType {
    id:string , 
    name:string , 
    isActive:boolean , 
    durationInDays:number 
    targetAgeGroup:number, 
    price:number
}

export interface NewSub {
    id?:string , 
    name:string , 
    durationInDays:number 
    targetAgeGroup:number, 
    price:number
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
