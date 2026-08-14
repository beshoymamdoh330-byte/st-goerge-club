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
"use client"
import Image from 'next/image'
import { memberType } from '../assets/assets'
import { useState, useEffect } from 'react'
import { useThemeContext } from '../assets/contexts'
import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
import img from "../../public/images/st-george-killing-dragon.png"
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    [key: string]: unknown;
}

interface UserResponseDto {
    id: string;
    fullName: string;
    phoneNumber: string;
    photoUrl: string;
    isActive: boolean;
    role?: string;
}

const defaultMember: memberType = {
    id: "",
    fullName: "",
    fullNumber: "",
    image: "",
    role: "",
    isActive: false
}

export default function ViewProfilePage({ member }: { member?: memberType }) {
    const { theme } = useThemeContext()
    const router = useRouter()

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [edit, setEdit] = useState<boolean>(false)
    const [userData, setUserData] = useState<memberType>(member || defaultMember)
    const [formData, setFormData] = useState<memberType>(member || defaultMember)

    // 🔒 التحقق من التوكن وجلب البيانات
    useEffect(() => {
        const verifyAndFetch = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                router.replace('/')
                return
            }

            try {
                const decoded = jwtDecode(token) as DecodedToken
                const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

                let isAdmin = false
                if (Array.isArray(roleClaim)) {
                    isAdmin = roleClaim.some(r => typeof r === 'string' && r.toLowerCase() === 'admin')
                } else if (typeof roleClaim === 'string') {
                    isAdmin = roleClaim.toLowerCase() === 'admin'
                }

                if (!isAdmin) {
                    router.replace('/')
                    return
                }

                setIsAuthorized(true)

                // fetch user data from API if ID is available
                if (member?.id) {
                    const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${member.id}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })

                    if (res.ok) {
                        const data: UserResponseDto = await res.json()
                        const fetchedUser: memberType = {
                            id: data.id,
                            fullName: data.fullName,
                            fullNumber: data.phoneNumber,
                            isActive: data.isActive,
                            image: data.photoUrl || "",
                            role: data.role || ""
                        }

                        setUserData(fetchedUser)
                        setFormData(fetchedUser)
                    }
                }
            } catch (error) {
                console.error("Authorization error:", error)
                localStorage.removeItem("token")
                router.replace('/')
            } finally {
                setIsLoading(false)
            }
        }

        verifyAndFetch()
    }, [router, member?.id])

    // ✏️ حفظ التعديلات على السيرفر
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token || !userData.id) return

        setIsSubmitting(true)
        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/User/update-user/${userData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: formData.id,
                    fullName: formData.fullName,
                    phoneNumber: formData.fullNumber,
                    isActive: formData.isActive
                })
            })

            if (res.ok) {
                setUserData(formData)
                setEdit(false)
            } else {
                console.error("Failed to update user")
            }
        } catch (error) {
            console.error("Error updating user:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // 🗑️ حذف / إلغاء تنشيط المستخدم
    const handleDelete = async () => {
        if (!confirm("هل أنت تأكد من رغبتك في حذف هذا المستخدم؟")) return;

        const token = localStorage.getItem("token")
        if (!token || !userData.id) return

        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/User/delete-user/${userData.id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })

            if (res.ok) {
                router.push('/dashboard/members') // العودة لقائمة الأعضاء
            }
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    if (isLoading || !isAuthorized) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "light-mode text-black" : "dark-mode text-white"}`}>
                <p className="text-xl font-bold text-blue-600">جاري التحقق من الصلاحيات وجلب البيانات...</p>
            </div>
        )
    }

    return (
        <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
            {/* Edit Form */}
            <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
                <button 
                    type="button"
                    onClick={() => setEdit(false)} 
                    className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                >
                    <XLg size={16} />
                </button>

                <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0 col-span-1 md:col-span-2'>
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Full Name</label>
                        <input
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent'
                            type="text"
                            value={formData.fullName || ''}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-1 block">Phone Number</label>
                        <input
                            onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
                            className='w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent'
                            type="text"
                            value={formData.fullNumber || ''}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2 col-span-1 md:col-span-2 my-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-sm font-semibold cursor-pointer">Active Account</label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>

            {/* Profile Display */}
            <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
                <div className="flex justify-center">
                    <Image
                        src={userData?.image && userData.image.trim() !== "" ? userData.image : img}
                        alt='Member Profile'
                        width={300}
                        height={300}
                        unoptimized
                        className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
                    />
                </div>

                <div className='grid grid-cols-1 gap-3'>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData?.fullName}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData?.fullNumber}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData?.isActive ? "Available" : "Canceled"}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
                        <button 
                            onClick={handleDelete}
                            className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'
                        >
                            <Trash2Fill /> Delete User
                        </button>

                        <button 
                            onClick={() => {
                                setFormData({ ...userData })
                                setEdit(true)
                            }} 
                            className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors cursor-pointer'
                        >
                            <PenFill /> Edit User
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}