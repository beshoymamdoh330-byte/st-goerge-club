// // "use client"
// // import Image from 'next/image'
// // import { memberType } from '../assets/assets'
// // import { useState } from 'react'
// // import { useThemeContext } from '../assets/contexts'
// // import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
// // import img from "../../public/images/st-george-killing-dragon.png"

// // export default function ViewProfilePage({ member }: { member: memberType }) {
// //     const { theme } = useThemeContext()
// //     const [edit, setEdit] = useState<boolean>(false)
// //     const [userData, setUserData] = useState<memberType>(member)

// //     // Form state typed directly with memberType
// //     const [formData, setFormData] = useState<memberType>({
// //         id: userData.id,
// //         fullName: userData.fullName,
// //         isActive: userData.isActive,
// //         fullNumber: userData.fullNumber,   
// //         image: userData.image , 
// //         role: userData.role
// //     })

// //     const handleEdit = async (e: React.FormEvent) => {
// //         e.preventDefault()

// //         try {
// //             setUserData(formData)
// //             setEdit(false)
// //         } catch (error) {
// //             console.error("Error updating user data:", error)
// //         }
// //     }

// //     return (
// //         <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
// //             {/* Edit Form */}
// //             <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
                
// //                 <button 
// //                     type="button"
// //                     onClick={() => setEdit(false)} 
// //                     className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
// //                 >
// //                     <XLg size={16} />
// //                 </button>

// //                 <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Full Name</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullName}
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Phone Number</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullNumber}
// //                             required
// //                         />
// //                     </div>

// //                     <button 
// //                         type="submit" 
// //                         className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
// //                     >
// //                         Save Changes
// //                     </button>
// //                 </form>
// //             </div>

// //             {/* Profile Display */}
// //             <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
// //                 <div className="flex justify-center">
// //                     <Image
// //                         src={userData?.image ? userData.image : img}
// //                         alt='Member Profile'
// //                         width={300}
// //                         height={300}
// //                         className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
// //                     />
// //                 </div>

// //                 <div className='grid grid-cols-1 gap-3'>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData.fullName}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData.fullNumber}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData.isActive ? "Available" : "Canceled"}</h3>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
// //                         <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'>
// //                             <Trash2Fill /> Delete User
// //                         </button>

// //                         <button 
// //                             onClick={() => {
// //                                 setFormData({ ...userData })
// //                                 setEdit(true)
// //                             }} 
// //                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
// //                         >
// //                             <PenFill /> Edit User
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </main>
// //     )
// // }



// // second eddit 

// // "use client"
// // import Image from 'next/image'
// // import { memberType } from '../assets/assets'
// // import { useState, useEffect } from 'react'
// // import { useThemeContext } from '../assets/contexts'
// // import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
// // import img from "../../public/images/st-george-killing-dragon.png"
// // import { useRouter } from 'next/navigation'
// // import { jwtDecode } from 'jwt-decode'

// // interface DecodedToken {
// //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
// //     [key: string]: unknown;
// // }

// // export default function ViewProfilePage({ member }: { member: memberType }) {
// //     const { theme } = useThemeContext()
// //     const router = useRouter()

// //     const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
// //     const [isLoading, setIsLoading] = useState<boolean>(true)

// //     const [edit, setEdit] = useState<boolean>(false)
// //     const [userData, setUserData] = useState<memberType>(member)

// //     const [formData, setFormData] = useState<memberType>({
// //         id: userData?.id,
// //         fullName: userData?.fullName,
// //         isActive: userData?.isActive,
// //         fullNumber: userData?.fullNumber,   
// //         image: userData?.image, 
// //         role: userData?.role
// //     })

// //     // 🔒 التحقق من التوكن والرول بأسلوب يمنع Cascading Renders
// //     useEffect(() => {
// //         queueMicrotask(() => {
// //             const token = localStorage.getItem("token")

// //             if (!token) {
// //                 router.replace('/login')
// //                 return
// //             }

// //             try {
// //                 const decoded = jwtDecode(token) as DecodedToken
// //                 const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

// //                 let isAdmin = false
// //                 if (Array.isArray(roleClaim)) {
// //                     isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
// //                 } else if (typeof roleClaim === 'string') {
// //                     isAdmin = roleClaim.toLowerCase() === 'admin'
// //                 }

// //                 if (isAdmin) {
// //                     setIsAuthorized(true)
// //                     setIsLoading(false)
// //                 } else {
// //                     router.replace('/login')
// //                 }
// //             } catch (error) {
// //                 console.error("Invalid token:", error)
// //                 localStorage.removeItem("token")
// //                 router.replace('/login')
// //             }
// //         })
// //     }, [router])

// //     const handleEdit = async (e: React.FormEvent) => {
// //         e.preventDefault()

// //         try {
// //             setUserData(formData)
// //             setEdit(false)
// //         } catch (error) {
// //             console.error("Error updating user data:", error)
// //         }
// //     }

// //     if (isLoading || !isAuthorized) {
// //         return (
// //             <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
// //                 <p className="text-xl font-bold text-blue-600">جاري التحقق من الصلاحيات...</p>
// //             </div>
// //         )
// //     }

// //     return (
// //         <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
// //             {/* Edit Form */}
// //             <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
                
// //                 <button 
// //                     type="button"
// //                     onClick={() => setEdit(false)} 
// //                     className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
// //                 >
// //                     <XLg size={16} />
// //                 </button>

// //                 <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Full Name</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullName || ''}
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Phone Number</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullNumber || ''}
// //                             required
// //                         />
// //                     </div>

// //                     <button 
// //                         type="submit" 
// //                         className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
// //                     >
// //                         Save Changes
// //                     </button>
// //                 </form>
// //             </div>

// //             {/* Profile Display */}
// //             <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
// //                 <div className="flex justify-center">
// //                     <Image
// //                         src={userData?.image ? userData.image : img}
// //                         alt='Member Profile'
// //                         width={300}
// //                         height={300}
// //                         className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
// //                     />
// //                 </div>

// //                 <div className='grid grid-cols-1 gap-3'>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData?.fullName}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData?.fullNumber}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData?.isActive ? "Available" : "Canceled"}</h3>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
// //                         <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'>
// //                             <Trash2Fill /> Delete User
// //                         </button>

// //                         <button 
// //                             onClick={() => {
// //                                 setFormData({ ...userData })
// //                                 setEdit(true)
// //                             }} 
// //                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
// //                         >
// //                             <PenFill /> Edit User
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </main>
// //     )
// // }




// // "use client"
// // import Image from 'next/image'
// // import { memberType } from '../assets/assets'
// // import { useState, useEffect } from 'react'
// // import { useThemeContext } from '../assets/contexts'
// // import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
// // import img from "../../public/images/st-george-killing-dragon.png"
// // import { useRouter } from 'next/navigation'
// // import { jwtDecode } from 'jwt-decode'

// // interface DecodedToken {
// //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
// //     [key: string]: unknown;
// // }

// // export default function ViewProfilePage({ member }: { member: memberType }) {
// //     const { theme } = useThemeContext()
// //     const router = useRouter()

// //     const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
// //     const [isLoading, setIsLoading] = useState<boolean>(true)

// //     const [edit, setEdit] = useState<boolean>(false)
// //     const [userData, setUserData] = useState<memberType>(member)

// //     const [formData, setFormData] = useState<memberType>({
// //         id: userData?.id,
// //         fullName: userData?.fullName,
// //         isActive: userData?.isActive,
// //         fullNumber: userData?.fullNumber,   
// //         image: userData?.image, 
// //         role: userData?.role
// //     })

// //     // 🔒 التحقق: فقط الأدمن يُسمح له بالبقاء، أي شخص آخر يترد لـ /
// //     useEffect(() => {
// //         queueMicrotask(() => {
// //             const token = localStorage.getItem("token")

// //             // 1. لو مفيش توكن خالص -> يروح للهوم / مباشرة
// //             if (!token) {
// //                 router.replace('/')
// //                 return
// //             }

// //             try {
// //                 const decoded = jwtDecode(token) as DecodedToken
// //                 const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

// //                 let isAdmin = false
// //                 if (Array.isArray(roleClaim)) {
// //                     isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
// //                 } else if (typeof roleClaim === 'string') {
// //                     isAdmin = roleClaim.toLowerCase() === 'admin'
// //                 }

// //                 if (isAdmin) {
// //                     setIsAuthorized(true)
// //                     setIsLoading(false)
// //                 } else {
// //                     // 2. لو مستخدم عادي (مش أدمن) -> يروح للهوم /
// //                     router.replace('/')
// //                 }
// //             } catch (error) {
// //                 console.error("Invalid token:", error)
// //                 localStorage.removeItem("token")
// //                 router.replace('/') // 3. لو التوكن باظ -> يروح للهوم /
// //             }
// //         })
// //     }, [router])

// //     const handleEdit = async (e: React.FormEvent) => {
// //         e.preventDefault()

// //         try {
// //             setUserData(formData)
// //             setEdit(false)
// //         } catch (error) {
// //             console.error("Error updating user data:", error)
// //         }
// //     }

// //     if (isLoading || !isAuthorized) {
// //         return (
// //             <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
// //                 <p className="text-xl font-bold text-blue-600">جاري التحقق من الصلاحيات...</p>
// //             </div>
// //         )
// //     }

// //     return (
// //         <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
// //             {/* Edit Form */}
// //             <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
                
// //                 <button 
// //                     type="button"
// //                     onClick={() => setEdit(false)} 
// //                     className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
// //                 >
// //                     <XLg size={16} />
// //                 </button>

// //                 <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Full Name</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullName || ''}
// //                             required
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="text-sm font-semibold mb-1 block">Phone Number</label>
// //                         <input
// //                             onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
// //                             className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
// //                             type="text"
// //                             value={formData.fullNumber || ''}
// //                             required
// //                         />
// //                     </div>

// //                     <button 
// //                         type="submit" 
// //                         className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
// //                     >
// //                         Save Changes
// //                     </button>
// //                 </form>
// //             </div>

// //             {/* Profile Display */}
// //             <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
// //                 <div className="flex justify-center">
// //                     <Image
// //                         src={userData?.image ? userData.image : img}
// //                         alt='Member Profile'
// //                         width={300}
// //                         height={300}
// //                         className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
// //                     />
// //                 </div>

// //                 <div className='grid grid-cols-1 gap-3'>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData?.fullName}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData?.fullNumber}</h3>
// //                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData?.isActive ? "Available" : "Canceled"}</h3>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
// //                         <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'>
// //                             <Trash2Fill /> Delete User
// //                         </button>

// //                         <button 
// //                             onClick={() => {
// //                                 setFormData({ ...userData })
// //                                 setEdit(true)
// //                             }} 
// //                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
// //                         >
// //                             <PenFill /> Edit User
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </main>
// //     )
// // }


// "use client"
// import Image from 'next/image'
// import { memberType } from '../assets/assets'
// import { useState, useEffect } from 'react'
// import { useThemeContext } from '../assets/contexts'
// import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
// import img from "../../public/images/st-george-killing-dragon.png"
// import { useRouter } from 'next/navigation'
// import { jwtDecode } from 'jwt-decode'

// interface DecodedToken {
//     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
//     [key: string]: unknown;
// }

// interface UserResponseDto {
//     id: string;
//     fullName: string;
//     phoneNumber: string;
//     photoUrl: string;
//     isActive: boolean;
//     role?: string;
// }

// // قيمة افتراضية لتفادي أخطاء undefined
// const defaultMember: memberType = {
//     id: "",
//     fullName: "",
//     fullNumber: "",
//     image: "",
//     role: "",
//     isActive: false
// }

// export default function ViewProfilePage({ member }: { member?: memberType }) {
//     const { theme } = useThemeContext()
//     const router = useRouter()

//     const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
//     const [isLoading, setIsLoading] = useState<boolean>(true)

//     const [edit, setEdit] = useState<boolean>(false)
    
//     // ✅ حلينا الخطأ هنا بإضافة (member || defaultMember)
//     const [userData, setUserData] = useState<memberType>(member || defaultMember)

//     const [formData, setFormData] = useState<memberType>({
//         id: userData?.id,
//         fullName: userData?.fullName,
//         isActive: userData?.isActive,
//         fullNumber: userData?.fullNumber,   
//         image: userData?.image, 
//         role: userData?.role
//     })

//     useEffect(() => {
//         queueMicrotask(async () => {
//             const token = localStorage.getItem("token")

//             if (!token) {
//                 router.replace('/')
//                 return
//             }

//             try {
//                 const decoded = jwtDecode(token) as DecodedToken
//                 const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

//                 let isAdmin = false
//                 if (Array.isArray(roleClaim)) {
//                     isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
//                 } else if (typeof roleClaim === 'string') {
//                     isAdmin = roleClaim.toLowerCase() === 'admin'
//                 }

//                 if (isAdmin) {
//                     setIsAuthorized(true)
                    
//                     if (member?.id) {
//                         try {
//                             const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${member.id}`, {
//                                 headers: {
//                                     "Authorization": `Bearer ${token}`
//                                 }
//                             })

//                             if (res.ok) {
//                                 const data: UserResponseDto = await res.json()
                                
//                                 const fetchedUser: memberType = {
//                                     id: data.id,
//                                     fullName: data.fullName,
//                                     fullNumber: data.phoneNumber,
//                                     isActive: data.isActive,
//                                     image: data.photoUrl || "",
//                                     role: data.role || ""
//                                 }

//                                 setUserData(fetchedUser)
//                                 setFormData(fetchedUser)
//                             }
//                         } catch (err) {
//                             console.error("Error fetching user details:", err)
//                         }
//                     }

//                     setIsLoading(false)
//                 } else {
//                     router.replace('/')
//                 }
//             } catch (error) {
//                 console.error("Invalid token:", error)
//                 localStorage.removeItem("token")
//                 router.replace('/')
//             }
//         })
//     }, [router, member?.id])

//     const handleEdit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setUserData(formData)
//         setEdit(false)
//     }

//     if (isLoading || !isAuthorized) {
//         return (
//             <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
//                 <p className="text-xl font-bold text-blue-600">جاري التحقق من الصلاحيات وجلب البيانات...</p>
//             </div>
//         )
//     }

//     return (
//         <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
//             {/* Edit Form */}
//             <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
//                 <button 
//                     type="button"
//                     onClick={() => setEdit(false)} 
//                     className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
//                 >
//                     <XLg size={16} />
//                 </button>

//                 <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
//                     <div>
//                         <label className="text-sm font-semibold mb-1 block">Full Name</label>
//                         <input
//                             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                             className='w-full p-3 rounded-2xl border border-blue-600 outline-none'
//                             type="text"
//                             value={formData.fullName || ''}
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-semibold mb-1 block">Phone Number</label>
//                         <input
//                             onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
//                             className='w-full p-3 rounded-2xl border border-blue-600 outline-none'
//                             type="text"
//                             value={formData.fullNumber || ''}
//                             required
//                         />
//                     </div>

//                     <button 
//                         type="submit" 
//                         className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer mt-2'
//                     >
//                         Save Changes
//                     </button>
//                 </form>
//             </div>

//             {/* Profile Display */}
//             <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
//                 <div className="flex justify-center">
//                     <Image
//                         src={userData?.image && userData.image.trim() !== "" ? userData.image : img}
//                         alt='Member Profile'
//                         width={300}
//                         height={300}
//                         unoptimized
//                         className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
//                     />
//                 </div>

//                 <div className='grid grid-cols-1 gap-3'>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData?.fullName}</h3>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData?.fullNumber}</h3>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData?.isActive ? "Available" : "Canceled"}</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
//                         <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'>
//                             <Trash2Fill /> Delete User
//                         </button>

//                         <button 
//                             onClick={() => {
//                                 setFormData({ ...userData })
//                                 setEdit(true)
//                             }} 
//                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
//                         >
//                             <PenFill /> Edit User
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }
// "use client"
// import Image from 'next/image'
// import { memberType } from '../assets/assets'
// import { useState, useEffect } from 'react'
// import { useThemeContext } from '../assets/contexts'
// import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
// import img from "../../public/images/st-george-killing-dragon.png"
// import { useRouter } from 'next/navigation'
// import { jwtDecode } from 'jwt-decode'

// interface DecodedToken {
//     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
//     [key: string]: unknown;
// }

// interface UserResponseDto {
//     id: string;
//     fullName: string;
//     phoneNumber: string;
//     photoUrl: string;
//     isActive: boolean;
//     role?: string;
// }

// const defaultMember: memberType = {
//     id: "",
//     fullName: "",
//     fullNumber: "",
//     image: "",
//     role: "",
//     isActive: false
// }

// export default function ViewProfilePage({ member }: { member?: memberType }) {
//     const { theme } = useThemeContext()
//     const router = useRouter()

//     const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
//     const [isLoading, setIsLoading] = useState<boolean>(true)
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

//     const [edit, setEdit] = useState<boolean>(false)
//     const [userData, setUserData] = useState<memberType>(member || defaultMember)
//     const [formData, setFormData] = useState<memberType>(member || defaultMember)

//     // 🔒 التحقق من التوكن وجلب البيانات
//     useEffect(() => {
//         const verifyAndFetch = async () => {
//             const token = localStorage.getItem("token")

//             if (!token) {
//                 router.replace('/')
//                 return
//             }

//             try {
//                 const decoded = jwtDecode(token) as DecodedToken
//                 const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

//                 let isAdmin = false
//                 if (Array.isArray(roleClaim)) {
//                     isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
//                 } else if (typeof roleClaim === 'string') {
//                     isAdmin = roleClaim.toLowerCase() === 'admin'
//                 }

//                 if (!isAdmin) {
//                     router.replace('/')
//                     return
//                 }

//                 setIsAuthorized(true)

//                 // fetch user data from API if ID is available
//                 if (member?.id) {
//                     const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${member.id}`, {
//                         headers: { "Authorization": `Bearer ${token}` }
//                     })

//                     if (res.ok) {
//                         const data: UserResponseDto = await res.json()
//                         const fetchedUser: memberType = {
//                             id: data.id,
//                             fullName: data.fullName,
//                             fullNumber: data.phoneNumber,
//                             isActive: data.isActive,
//                             image: data.photoUrl || "",
//                             role: data.role || ""
//                         }

//                         setUserData(fetchedUser)
//                         setFormData(fetchedUser)
//                     }
//                 }
//             } catch (error) {
//                 console.error("Authorization error:", error)
//                 localStorage.removeItem("token")
//                 router.replace('/')
//             } finally {
//                 setIsLoading(false)
//             }
//         }

//         verifyAndFetch()
//     }, [router, member?.id])

//     // ✏️ حفظ التعديلات على السيرفر
//     const handleEdit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         const token = localStorage.getItem("token")
//         if (!token || !userData.id) return

//         setIsSubmitting(true)
//         try {
//             const res = await fetch(`https://mahinproject.runasp.net/api/User/update-user/${userData.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     id: formData.id,
//                     fullName: formData.fullName,
//                     phoneNumber: formData.fullNumber,
//                     isActive: formData.isActive
//                 })
//             })

//             if (res.ok) {
//                 setUserData(formData)
//                 setEdit(false)
//             } else {
//                 console.error("Failed to update user")
//             }
//         } catch (error) {
//             console.error("Error updating user:", error)
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     // 🗑️ حذف / إلغاء تنشيط المستخدم
//     const handleDelete = async () => {
//         if (!confirm("هل أنت تأكد من رغبتك في حذف هذا المستخدم؟")) return;

//         const token = localStorage.getItem("token")
//         if (!token || !userData.id) return

//         try {
//             const res = await fetch(`https://mahinproject.runasp.net/api/User/delete-user/${userData.id}`, {
//                 method: "DELETE",
//                 headers: { "Authorization": `Bearer ${token}` }
//             })

//             if (res.ok) {
//                 router.push('/dashboard/members') // العودة لقائمة الأعضاء
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error)
//         }
//     }

//     if (isLoading || !isAuthorized) {
//         return (
//             <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
//                 <p className="text-xl font-bold text-blue-600">جاري التحقق من الصلاحيات وجلب البيانات...</p>
//             </div>
//         )
//     }

//     return (
//         <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
//             {/* Edit Form */}
//             <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
//                 <button 
//                     type="button"
//                     onClick={() => setEdit(false)} 
//                     className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
//                 >
//                     <XLg size={16} />
//                 </button>

//                 <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
//                     <div>
//                         <label className="text-sm font-semibold mb-1 block">Full Name</label>
//                         <input
//                             onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                             className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent'
//                             type="text"
//                             value={formData.fullName || ''}
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-semibold mb-1 block">Phone Number</label>
//                         <input
//                             onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
//                             className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent'
//                             type="text"
//                             value={formData.fullNumber || ''}
//                             required
//                         />
//                     </div>

//                     <div className="flex items-center gap-2 col-span-1 md:col-span-2 my-2">
//                         <input
//                             type="checkbox"
//                             id="isActive"
//                             checked={formData.isActive}
//                             onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                             className="w-5 h-5 accent-blue-600 cursor-pointer"
//                         />
//                         <label htmlFor="isActive" className="text-sm font-semibold cursor-pointer">Active Account</label>
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={isSubmitting}
//                         className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
//                     >
//                         {isSubmitting ? "Saving..." : "Save Changes"}
//                     </button>
//                 </form>
//             </div>

//             {/* Profile Display */}
//             <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
//                 <div className="flex justify-center">
//                     <Image
//                         src={userData?.image && userData.image.trim() !== "" ? userData.image : img}
//                         alt='Member Profile'
//                         width={300}
//                         height={300}
//                         unoptimized
//                         className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
//                     />
//                 </div>

//                 <div className='grid grid-cols-1 gap-3'>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData?.fullName}</h3>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData?.fullNumber}</h3>
//                     <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData?.isActive ? "Available" : "Canceled"}</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
//                         <button 
//                             onClick={handleDelete}
//                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'
//                         >
//                             <Trash2Fill /> Delete User
//                         </button>

//                         <button 
//                             onClick={() => {
//                                 setFormData({ ...userData })
//                                 setEdit(true)
//                             }} 
//                             className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
//                         >
//                             <PenFill /> Edit User
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }



// "use client"
// import Image from 'next/image'
// import { useState, useEffect } from 'react'
// import { useThemeContext } from '../assets/contexts'
// import { 
//     PenFill, 
//     Trash2Fill, 
//     XLg, 
//     PersonFill, 
//     TelephoneFill, 
//     EnvelopeFill, 
//     ShieldCheck, 
//     CalendarCheckFill, 
//     CardChecklist, 
//     CalendarEventFill, 
//     HourglassSplit,
//     CloudUploadFill,
//     CameraFill
// } from 'react-bootstrap-icons'
// import img from "../../public/images/st-george-killing-dragon.png"
// import { useRouter } from 'next/navigation'
// import { jwtDecode } from 'jwt-decode'

// interface DecodedToken {
//     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
//     [key: string]: unknown;
// }

// export interface UserResponseDto {
//     id: string;
//     fullName: string;
//     phoneNumber: string;
//     email?: string;
//     photoUrl?: string;
//     isActive: boolean;
//     role?: string;
//     age?: number | string;
//     subscriptionName?: string;
//     createdAt?: string;
//     expirationDate?: string;
// }

// export interface ExtendedMemberType {
//     id: string;
//     fullName: string;
//     fullNumber: string;
//     email: string;
//     image: string;
//     role: string;
//     isActive: boolean;
//     age: string;
//     subscriptionName: string;
//     createdAt: string;
//     expirationDate: string;
// }

// const defaultMember: ExtendedMemberType = {
//     id: "",
//     fullName: "",
//     fullNumber: "",
//     email: "",
//     image: "",
//     role: "",
//     isActive: false,
//     age: "غير محدد",
//     subscriptionName: "لا يوجد اشتراك",
//     createdAt: "غير محدد",
//     expirationDate: "غير محدد"
// }

// export default function ViewProfilePage({ member }: { member?: Partial<ExtendedMemberType> }) {
//     const { theme } = useThemeContext()
//     const router = useRouter()

//     const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
//     const [isLoading, setIsLoading] = useState<boolean>(true)
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

//     const [edit, setEdit] = useState<boolean>(false)
//     const [userData, setUserData] = useState<ExtendedMemberType>({ ...defaultMember, ...member })
    
//     // ✏️ الحقول الأربعة والتعديل المباشر للصورة من الجهاز
//     const [formData, setFormData] = useState({
//         fullName: "",
//         fullNumber: "",
//         email: "",
//         imageFile: null as File | null,
//         imagePreview: "" // يحمل صورة Base64 المختارة من جهاز المستخدم
//     })

//     // 🔒 التحقق والتأكد من الصلاحيات وجلب البيانات
//     useEffect(() => {
//         const verifyAndFetch = async () => {
//             const token = localStorage.getItem("token")

//             if (!token) {
//                 router.replace('/')
//                 return
//             }

//             try {
//                 const decoded = jwtDecode(token) as DecodedToken
//                 const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

//                 let isAdmin = false
//                 if (Array.isArray(roleClaim)) {
//                     isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
//                 } else if (typeof roleClaim === 'string') {
//                     isAdmin = roleClaim.toLowerCase() === 'admin'
//                 }

//                 if (!isAdmin) {
//                     router.replace('/')
//                     return
//                 }

//                 setIsAuthorized(true)

//                 if (member?.id) {
//                     const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${member.id}`, {
//                         headers: { "Authorization": `Bearer ${token}` }
//                     })

//                     if (res.ok) {
//                         const data: UserResponseDto = await res.json()
                        
//                         const fetchedUser: ExtendedMemberType = {
//                             id: data.id || "",
//                             fullName: data.fullName || "",
//                             fullNumber: data.phoneNumber || "",
//                             email: data.email || "",
//                             isActive: data.isActive ?? false,
//                             image: data.photoUrl || "",
//                             role: data.role || "Member",
//                             age: data.age ? `${data.age} سنة` : "غير محدد",
//                             subscriptionName: data.subscriptionName || "لا يوجد اشتراك",
//                             createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('ar-EG') : "غير محدد",
//                             expirationDate: data.expirationDate ? new Date(data.expirationDate).toLocaleDateString('ar-EG') : "غير محدد"
//                         }

//                         setUserData(fetchedUser)
//                         setFormData({
//                             fullName: fetchedUser.fullName,
//                             fullNumber: fetchedUser.fullNumber,
//                             email: fetchedUser.email,
//                             imageFile: null,
//                             imagePreview: fetchedUser.image
//                         })
//                     }
//                 }
//             } catch (error) {
//                 console.error("Authorization error:", error)
//                 localStorage.removeItem("token")
//                 router.replace('/')
//             } finally {
//                 setIsLoading(false)
//             }
//         }

//         verifyAndFetch()
//     }, [router, member?.id])

//     // 📸 قراءة ملف الصورة المختارة من جهاز المستخدم بواسطة FileReader
//     const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (file) {
//             const reader = new FileReader()
//             reader.onloadend = () => {
//                 const base64String = reader.result as string
//                 setFormData(prev => ({
//                     ...prev,
//                     imageFile: file,
//                     imagePreview: base64String // حفظ Base64 للمعاينة وللإرسال
//                 }))
//             }
//             reader.readAsDataURL(file)
//         }
//     }

//     // ✏️ إرسال التعديلات للـ API
//     const handleEdit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         const token = localStorage.getItem("token")
//         if (!token || !userData.id) return

//         setIsSubmitting(true)
//         try {
//             // إرسال البيانات JSON مع رابط/Base64 الصورة المرفوعة من الجهاز
//             const payload = {
//                 id: userData.id,
//                 fullName: formData.fullName,
//                 phoneNumber: formData.fullNumber,
//                 email: formData.email,
//                 photoUrl: formData.imagePreview // تحتوي إما على رابط قديم أو Base64 الصورة الجديدة المرفوعة
//             }

//             const res = await fetch(`https://mahinproject.runasp.net/api/User/update-user/${userData.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(payload)
//             })

//             if (res.ok) {
//                 setUserData(prev => ({
//                     ...prev,
//                     fullName: formData.fullName,
//                     fullNumber: formData.fullNumber,
//                     email: formData.email,
//                     image: formData.imagePreview
//                 }))
//                 setEdit(false)
//             } else {
//                 console.error("فشل في تحديث البيانات")
//             }
//         } catch (error) {
//             console.error("Error updating user:", error)
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     // 🗑️ حذف المستخدم
//     const handleDelete = async () => {
//         if (!confirm("هل أنت تأكد من رغبتك في حذف هذا المستخدم؟")) return;

//         const token = localStorage.getItem("token")
//         if (!token || !userData.id) return

//         try {
//             const res = await fetch(`https://mahinproject.runasp.net/api/User/delete-user/${userData.id}`, {
//                 method: "DELETE",
//                 headers: { "Authorization": `Bearer ${token}` }
//             })

//             if (res.ok) {
//                 router.push('/dashboard/members')
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error)
//         }
//     }

//     if (isLoading || !isAuthorized) {
//         return (
//             <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-950 text-white"}`}>
//                 <p className="text-xl font-bold text-blue-600 animate-pulse">جاري التحقق من الصلاحيات وجلب البيانات...</p>
//             </div>
//         )
//     }

//     return (
//         <main className={`w-full py-10 pt-28 px-5 md:px-20 min-h-screen transition-colors ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-white"}`}>
            
//             {/* 📝 EDIT FORM (نموذج التعديل) */}
//             {edit && (
//                 <div className={`p-6 mb-10 border-2 border-blue-600 rounded-3xl relative shadow-xl backdrop-blur-md ${theme === "light" ? "bg-white/90 text-black" : "bg-gray-900/90 text-white"}`}>
//                     <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-300 dark:border-gray-700">
//                         <h2 className="text-2xl font-bold text-blue-600">تعديل البيانات الأساسية</h2>
//                         <button 
//                             type="button"
//                             onClick={() => setEdit(false)} 
//                             className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all cursor-pointer"
//                         >
//                             <XLg size={16} />
//                         </button>
//                     </div>

//                     <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        
//                         {/* 🖼️ رفـع صورة من الجهاز ومعاينتها */}
//                         <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-400 dark:border-blue-700 rounded-2xl bg-blue-50/40 dark:bg-gray-800/40 mb-2">
//                             <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-blue-600 mb-3 shadow-md">
//                                 <Image
//                                     src={formData.imagePreview && formData.imagePreview.trim() !== "" ? formData.imagePreview : img}
//                                     alt="Preview"
//                                     fill
//                                     unoptimized
//                                     className="object-cover"
//                                 />
//                             </div>

//                             <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
//                                 <CloudUploadFill size={18} />
//                                 <span>رفع صورة جديدة من جهازك</span>
//                                 <input 
//                                     type="file" 
//                                     accept="image/*" 
//                                     onChange={handleImageFileChange} 
//                                     className="hidden" 
//                                 />
//                             </label>

//                             {formData.imageFile && (
//                                 <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
//                                     ✓ تم اختيار: {formData.imageFile.name}
//                                 </p>
//                             )}
//                         </div>

//                         {/* 1️⃣ الاسم بالكامل */}
//                         <div>
//                             <label className="text-sm font-semibold mb-1 block">الاسم بالكامل (Full Name)</label>
//                             <input
//                                 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                                 className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
//                                 type="text"
//                                 value={formData.fullName}
//                                 required
//                             />
//                         </div>

//                         {/* 2️⃣ رقم الهاتف */}
//                         <div>
//                             <label className="text-sm font-semibold mb-1 block">رقم الهاتف (Phone Number)</label>
//                             <input
//                                 onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
//                                 className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
//                                 type="text"
//                                 value={formData.fullNumber}
//                                 required
//                             />
//                         </div>

//                         {/* 3️⃣ البريد الإلكتروني */}
//                         <div className="col-span-1 md:col-span-2">
//                             <label className="text-sm font-semibold mb-1 block">البريد الإلكتروني (Email)</label>
//                             <input
//                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                 className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
//                                 type="email"
//                                 value={formData.email}
//                                 required
//                             />
//                         </div>

//                         <button 
//                             type="submit" 
//                             disabled={isSubmitting}
//                             className='col-span-1 md:col-span-2 p-3.5 mt-2 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-800 transition-all disabled:bg-gray-500 cursor-pointer shadow-lg shadow-blue-600/30'
//                         >
//                             {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
//                         </button>
//                     </form>
//                 </div>
//             )}

//             {/* 👤 DISPLAY SECTION (عرض البيانات) */}
//             <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 rounded-3xl border shadow-xl ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"}`}>
                
//                 {/* الصورة الشخصية وحالة الحساب */}
//                 <div className="flex flex-col items-center justify-center col-span-1">
//                     <div className="relative w-48 h-48 md:w-60 md:h-60 border-4 border-blue-600 rounded-full overflow-hidden shadow-lg mb-4">
//                         <Image
//                             src={userData?.image && userData.image.trim() !== "" ? userData.image : img}
//                             alt={userData?.fullName || 'Member Profile'}
//                             fill
//                             unoptimized
//                             className='object-cover'
//                         />
//                     </div>
//                     <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${userData?.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}`}>
//                         {userData?.isActive ? "● حساب نشط" : "● حساب معطل"}
//                     </span>
//                 </div>

//                 {/* تفاصيل البيانات */}
//                 <div className='col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    
//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <PersonFill className="text-blue-600 text-2xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">الاسم بالكامل</p>
//                             <h4 className="text-lg font-bold">{userData?.fullName || "غير مدخل"}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <TelephoneFill className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">رقم الهاتف</p>
//                             <h4 className="text-lg font-bold">{userData?.fullNumber || "غير مدخل"}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <EnvelopeFill className="text-blue-600 text-xl flex-shrink-0" />
//                         <div className="overflow-hidden">
//                             <p className="text-xs text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
//                             <h4 className="text-base font-bold truncate">{userData?.email || "غير مدخل"}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <HourglassSplit className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">العمر / المرحلة</p>
//                             <h4 className="text-lg font-bold">{userData?.age}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <ShieldCheck className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">الصلاحية (Role)</p>
//                             <h4 className="text-lg font-bold">{userData?.role}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <CardChecklist className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">باقة الاشتراك</p>
//                             <h4 className="text-lg font-bold">{userData?.subscriptionName}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <CalendarCheckFill className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ الانضمام</p>
//                             <h4 className="text-lg font-bold">{userData?.createdAt}</h4>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
//                         <CalendarEventFill className="text-blue-600 text-xl flex-shrink-0" />
//                         <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ انتهاء الاشتراك</p>
//                             <h4 className="text-lg font-bold">{userData?.expirationDate}</h4>
//                         </div>
//                     </div>

//                     {/* أزرار التحكم */}
//                     <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
//                         <button 
//                             onClick={() => {
//                                 setFormData({
//                                     fullName: userData.fullName,
//                                     fullNumber: userData.fullNumber,
//                                     email: userData.email,
//                                     imageFile: null,
//                                     imagePreview: userData.image
//                                 })
//                                 setEdit(true)
//                             }} 
//                             className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-all cursor-pointer shadow-md shadow-blue-600/20'
//                         >
//                             <PenFill /> تعديل البيانات الأساسية
//                         </button>

//                         <button 
//                             onClick={handleDelete}
//                             className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all cursor-pointer shadow-md shadow-red-600/20'
//                         >
//                             <Trash2Fill /> حذف المستخدم
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </main>
//     )
// }




"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useThemeContext } from '../assets/contexts'
import { 
    PenFill, 
    Trash2Fill, 
    XLg, 
    PersonFill, 
    TelephoneFill, 
    EnvelopeFill, 
    ShieldCheck, 
    CalendarCheckFill, 
    CardChecklist, 
    CalendarEventFill, 
    HourglassSplit,
    CloudUploadFill,
    GenderAmbiguous
} from 'react-bootstrap-icons'
import img from "../../public/images/st-george-killing-dragon.png"
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
    role?: string | string[];
    nameid?: string;
    sub?: string;
    [key: string]: unknown;
}

export interface ActiveSubscriptionDto {
    subscriptionPlanId?: number;
    planName?: string;
    price?: number;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
}

export interface UserApiResponse {
    id: string;
    fullName: string;
    phoneNumber: string;
    photoUrl?: string;
    nfcUrl?: string;
    email?: string;
    isActive: boolean;
    gender?: string | number;
    ageGroup?: string | number;
    role?: string;
    activeSubscription?: ActiveSubscriptionDto | null;
}

export interface ExtendedMemberType {
    id: string;
    fullName: string;
    fullNumber: string;
    email: string;
    image: string;
    role: string;
    isActive: boolean;
    ageGroup: string;
    gender: string;
    subscriptionName: string;
    createdAt: string;
    expirationDate: string;
}

const defaultMember: ExtendedMemberType = {
    id: "",
    fullName: "",
    fullNumber: "",
    email: "",
    image: "",
    role: "",
    isActive: false,
    ageGroup: "غير محدد",
    gender: "Male",
    subscriptionName: "لا يوجد اشتراك نشط",
    createdAt: "غير محدد",
    expirationDate: "غير محدد"
}

// دالة مساعدة لتحويل قيمة ageGroup إلى نص للعرض
const parseAgeGroupToString = (val?: string | number): string => {
    if (!val) return "غير محدد"
    const strVal = String(val).trim()
    if (strVal === "1" || strVal.includes("ابتدائي")) return "ابتدائي"
    if (strVal === "2" || strVal.includes("إعدادي")) return "إعدادي"
    if (strVal === "3" || strVal.includes("ثانوي")) return "ثانوي"
    return strVal
}

// دالة مساعدة لتحويل قيمة ageGroup إلى رقم للباك إند
const parseAgeGroupToNumber = (val: string | number): number => {
    const strVal = String(val).trim()
    if (strVal === "1" || strVal.includes("ابتدائي")) return 1
    if (strVal === "2" || strVal.includes("إعدادي")) return 2
    if (strVal === "3" || strVal.includes("ثانوي")) return 3
    return Number(val) || 1
}

export default function ViewProfilePage({ member }: { member?: Partial<ExtendedMemberType> }) {
    const { theme } = useThemeContext()
    const router = useRouter()

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [edit, setEdit] = useState<boolean>(false)
    const [userData, setUserData] = useState<ExtendedMemberType>({ ...defaultMember, ...member })

    // احتواء الـ id والبيانات في الـ formData
    const [formData, setFormData] = useState({
        id: "",
        fullName: "",
        fullNumber: "",
        email: "",
        ageGroup: 1, // 1: ابتدائي, 2: إعدادي, 3: ثانوي
        gender: 1,   // 1: ذكر (Male), 2: أنثى (Female)
        imageFile: null as File | null,
        imagePreview: ""
    })

    // 🔒 1. التحقق وجلب البيانات عند البداية
    useEffect(() => {
        const verifyAndFetch = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                router.replace('/')
                return
            }

            try {
                const decoded = jwtDecode(token) as DecodedToken

                const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role
                let isAdmin = false
                if (Array.isArray(roleClaim)) {
                    isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
                } else if (typeof roleClaim === 'string') {
                    isAdmin = roleClaim.toLowerCase() === 'admin'
                }

                const currentUserId = (
                    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
                    decoded.nameid ||
                    decoded.sub
                ) as string | undefined

                const targetUserId = member?.id

                if (targetUserId && targetUserId !== currentUserId && !isAdmin) {
                    router.replace('/')
                    return
                }

                setIsAuthorized(true)

                const userIdToFetch = targetUserId || currentUserId || userData.id

                if (userIdToFetch) {
                    const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${userIdToFetch}`, {
                        headers: { 
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })

                    if (res.ok) {
                        const data: UserApiResponse = await res.json()
                        const sub = data.activeSubscription

                        const formattedStartDate = sub?.startDate 
                            ? new Date(sub.startDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) 
                            : "غير محدد"

                        const formattedEndDate = sub?.endDate 
                            ? new Date(sub.endDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) 
                            : "غير محدد"

                        const subscriptionTitle = sub?.planName 
                            ? `${sub.planName} (${sub.price} ج.م)` 
                            : "لا يوجد اشتراك نشط"

                        const rawGender = String(data.gender)
                        const isMale = rawGender === "1" || rawGender.toLowerCase() === "male"

                        const fetchedUser: ExtendedMemberType = {
                            id: data.id || userIdToFetch,
                            fullName: data.fullName || "",
                            fullNumber: data.phoneNumber || "",
                            email: data.email || "",
                            isActive: data.isActive ?? false,
                            image: data.photoUrl || "",
                            role: data.role || "user",
                            ageGroup: parseAgeGroupToString(data.ageGroup),
                            gender: isMale ? "Male" : "Female",
                            subscriptionName: subscriptionTitle,
                            createdAt: formattedStartDate,
                            expirationDate: formattedEndDate
                        }

                        setUserData(fetchedUser)
                    }
                }
            } catch (error) {
                console.error("Authorization or fetch error:", error)
                localStorage.removeItem("token")
                router.replace('/')
            } finally {
                setIsLoading(false)
            }
        }

        verifyAndFetch()
    }, [router, member?.id])

    // 📸 2. معالجة معاينة رفع الصورة
    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    // ✏️ 3. فتح وتعبئة مودال التعديل بربط الـ id والبيانات الحالية
    const openEditModal = () => {
        setFormData({
            id: userData.id,
            fullName: userData.fullName || "",
            fullNumber: userData.fullNumber || "",
            email: userData.email || "",
            ageGroup: parseAgeGroupToNumber(userData.ageGroup),
            gender: userData.gender === "Male" ? 1 : 2,
            imageFile: null,
            imagePreview: userData.image || ""
        })
        setEdit(true)
    }

    // 💾 4. دالة التعديل بأسلوب PUT مع طباعة التفاصيل والتوافق الأقصى
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
            alert("❌ جلسة تسجيل الدخول انتهت، يرجى إعادة تسجيل الدخول.")
            return
        }

        // جلب الـ ID من كافة المصادر المتاحة (FormData -> UserData -> Token)
        let currentId = formData.id || userData.id
        if (!currentId || String(currentId).trim() === "") {
            try {
                const decoded: DecodedToken = jwtDecode(token)
                currentId = (
                    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
                    decoded.nameid ||
                    decoded.sub ||
                    ""
                ) as string
            } catch (err) {
                console.error("Token decoding error:", err)
            }
        }

        const cleanId = String(currentId).trim()

        if (!cleanId) {
            alert("❌ خطأ: تعذر العثور على ID المستخدم!")
            return
        }

        setIsSubmitting(true)

        // إعداد البيانات وتجنب إرسال null لأي حقل
        const updatePayload = {
            id: cleanId,
            fullName: formData.fullName?.trim() || userData.fullName || "",
            photoUrl: formData.imagePreview || userData.image || "",
            phoneNumber: formData.fullNumber?.trim() || userData.fullNumber || "",
            email: formData.email?.trim() || userData.email || "",
            ageGroup: Number(formData.ageGroup) || 1,
            gender: Number(formData.gender) || 1
        }

        console.log("🚀 Payload Being Sent:", JSON.stringify(updatePayload, null, 2))

        try {
            // إرسال طلب PUT مع إرفاق الـ ID في الـ Query String والـ Body لضمان التوافق مع الباك إند
            const res = await fetch(`https://mahinproject.runasp.net/api/User/update-user?id=${cleanId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatePayload)
            })

            const responseData = await res.text()
            console.log("📥 Server Response:", responseData)

            if (res.ok) {
                alert("تم حفظ التعديلات بنجاح! ✅")

                setUserData(prev => ({
                    ...prev,
                    id: cleanId,
                    fullName: updatePayload.fullName,
                    fullNumber: updatePayload.phoneNumber,
                    email: updatePayload.email,
                    ageGroup: parseAgeGroupToString(updatePayload.ageGroup),
                    gender: updatePayload.gender === 1 ? "Male" : "Female",
                    image: updatePayload.photoUrl
                }))

                setEdit(false)
            } else {
                alert(`فشل التحديث من الباك إند (${res.status}):\n${responseData}`)
            }
        } catch (error) {
            console.error("Fetch Error:", error)
            alert("حدث خطأ في الاتصال بالباك إند")
        } finally {
            setIsSubmitting(false)
        }
    }

    // 🗑️ 5. حذف المستخدم
    const handleDelete = async () => {
        if (!userData.id || !confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return

        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/User/delete-user/${userData.id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            })

            if (res.ok) {
                alert("تم الحذف بنجاح! 🗑️")
                router.push('/dashboard/members')
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading || !isAuthorized) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-950 text-white"}`}>
                <p className="text-xl font-bold text-blue-600 animate-pulse">جاري التحقق وجلب البيانات...</p>
            </div>
        )
    }

    return (
        <main className={`w-full py-10 pt-28 px-5 md:px-20 min-h-screen transition-colors ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-white"}`}>

            {/* 📝 نموذج التعديل */}
            {edit && (
                <div className={`p-6 mb-10 border-2 border-blue-600 rounded-3xl relative shadow-xl ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-300 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-blue-600">تعديل بيانات المستخدم</h2>
                        <button type="button" onClick={() => setEdit(false)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all cursor-pointer">
                            <XLg size={16} />
                        </button>
                    </div>

                    <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        {/* photoUrl */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-400 rounded-2xl mb-2">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-blue-600 mb-3 shadow-md">
                                <Image
                                    src={formData.imagePreview && formData.imagePreview.trim() !== "" ? formData.imagePreview : img}
                                    alt="Preview"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>

                            <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
                                <CloudUploadFill size={18} />
                                <span>اختيار صورة جديدة</span>
                                <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                            </label>
                        </div>

                        {/* fullName */}
                        <div>
                            <label className="text-sm font-semibold mb-1 block">الاسم بالكامل</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
                                type="text"
                                value={formData.fullName}
                                required
                            />
                        </div>

                        {/* phoneNumber */}
                        <div>
                            <label className="text-sm font-semibold mb-1 block">رقم الهاتف</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
                                className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
                                type="text"
                                value={formData.fullNumber}
                                required
                            />
                        </div>

                        {/* email */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-sm font-semibold mb-1 block">البريد الإلكتروني</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500'
                                type="email"
                                value={formData.email}
                                required
                            />
                        </div>

                        {/* ageGroup */}
                        <div>
                            <label className="text-sm font-semibold mb-1 block">المرحلة العمرية (Age Group)</label>
                            <select
                                value={formData.ageGroup}
                                onChange={(e) => setFormData({ ...formData, ageGroup: Number(e.target.value) })}
                                className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500'
                            >
                                <option value={0}>ابتدائي (0)</option>
                                <option value={1}>إعدادي (1)</option>
                                <option value={2}>ثانوي (2)</option>
                                <option value={3}>شباب و خرجين(3)</option>
                            </select>
                        </div>

                        {/* gender */}
                        <div>
                            <label className="text-sm font-semibold mb-1 block">النوع (Gender)</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: Number(e.target.value) })}
                                className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500'
                            >
                                <option value={0}>ذكر (1)</option>
                                <option value={1}>أنثى (2)</option>
                            </select>
                        </div>

                        {/* زر الحفظ */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className='col-span-1 md:col-span-2 p-3.5 mt-2 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-800 transition-all disabled:bg-gray-500 cursor-pointer shadow-lg shadow-blue-600/30'
                        >
                            {isSubmitting ? "جاري إرسال التعديلات للسيرفر..." : "حفظ التعديلات"}
                        </button>
                    </form>
                </div>
            )}

            {/* 👤 عرض البروفايل */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 rounded-3xl border shadow-xl ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-800"}`}>

                <div className="flex flex-col items-center justify-center col-span-1">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 border-4 border-blue-600 rounded-full overflow-hidden shadow-lg mb-4">
                        <Image
                            src={userData?.image && userData.image.trim() !== "" ? userData.image : img}
                            alt={userData?.fullName || 'User Profile'}
                            fill
                            unoptimized
                            className='object-cover'
                        />
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${userData?.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}`}>
                        {userData?.isActive ? "● حساب نشط" : "● حساب معطل"}
                    </span>
                </div>

                <div className='col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <PersonFill className="text-blue-600 text-2xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">الاسم بالكامل</p>
                            <h4 className="text-lg font-bold">{userData?.fullName || "غير مدخل"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <TelephoneFill className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">رقم الهاتف</p>
                            <h4 className="text-lg font-bold">{userData?.fullNumber || "غير مدخل"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <EnvelopeFill className="text-blue-600 text-xl flex-shrink-0" />
                        <div className="overflow-hidden">
                            <p className="text-xs text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                            <h4 className="text-base font-bold truncate">{userData?.email || "غير مدخل"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <GenderAmbiguous className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">النوع</p>
                            <h4 className="text-lg font-bold">{userData?.gender === "Male" ? "ذكر" : "أنثى"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <HourglassSplit className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">المرحلة</p>
                            <h4 className="text-lg font-bold">{userData?.ageGroup}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <ShieldCheck className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">الصلاحية (Role)</p>
                            <h4 className="text-lg font-bold">{userData?.role}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <CardChecklist className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">باقة الاشتراك</p>
                            <h4 className="text-lg font-bold">{userData?.subscriptionName}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <CalendarCheckFill className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ بداية الاشتراك</p>
                            <h4 className="text-lg font-bold">{userData?.createdAt}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                        <CalendarEventFill className="text-blue-600 text-xl flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ انتهاء الاشتراك</p>
                            <h4 className="text-lg font-bold">{userData?.expirationDate}</h4>
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <button 
                            onClick={openEditModal} 
                            className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-all cursor-pointer shadow-md shadow-blue-600/20'
                        >
                            <PenFill /> تعديل البيانات الأساسية
                        </button>

                        <button 
                            onClick={handleDelete}
                            className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all cursor-pointer shadow-md shadow-red-600/20'
                        >
                            <Trash2Fill /> حذف المستخدم
                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}