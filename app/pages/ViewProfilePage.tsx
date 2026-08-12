"use client"
import Image from 'next/image'
import { memberType, NewUser } from '../assets/assets'
import { useState } from 'react'
import { useThemeContext } from '../assets/contexts'
import { PenFill, Trash2Fill, XLg } from 'react-bootstrap-icons'
import img from "../../public/images/st-george-killing-dragon.png"

export default function ViewProfilePage({ member }: { member: memberType }) {
    const { theme } = useThemeContext()
    const [edit, setEdit] = useState<boolean>(false)

    const [userData, setUserData] = useState<memberType>(member)

    // بيانات الـ Form المؤقتة للتعديل
    const [newUser, setNewUser] = useState<NewUser>({
        id: userData.id,
        fullName: userData.fullName,
        isActive: userData.isActive,
        fullNumber: userData.fullNumber,   
        image: userData.image
    })

    // دالة حفظ التعديلات وإرسالها للـ Database
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // تحديث الواجهة فوراً بالتغييرات الجديدة
            setUserData(prev => ({
                ...prev,
                fullName: newUser.fullName,
                fullNumber: newUser.fullNumber,
                id: newUser.id,
                image: newUser.image
            }))

            setEdit(false) // إغلاق النموذج
        } catch (error) {
            console.error("خطأ أثناء تحديث البيانات:", error)
        }
    }

    return (
        <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}`}>
            
            {/* Form التعديل */}
            <div className={`items-center ${edit ? "grid" : "hidden"} gap-2.5 p-5 mb-10 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2 relative`}>
                
                {/* زر إغلاق النموذج (Cancel) */}
                <button 
                    onClick={() => setEdit(false)} 
                    className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                >
                    <XLg size={16} />
                </button>

                <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 md:mt-0'>
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Full Name</label>
                        <input
                            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                            className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
                            type="text"
                            value={newUser.fullName}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-1 block">Phone Number</label>
                        <input
                            onChange={(e) => setNewUser({ ...newUser, fullNumber: e.target.value })}
                            className='w-full p-3 rounded-2xl border border-blue-600 focus:bg-blue-500 focus:text-white outline-none transition-all'
                            type="text"
                            value={newUser.fullNumber}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400 cursor-pointer mt-2'
                    >
                        Save Changes
                    </button>
                </form>

                <div className="flex items-center justify-center flex-col gap-2.5">
                    <Image
                        src={userData?.image ? userData.image : img}
                        alt='Member Profile'
                        width={300}
                        height={300}
                        className='w-48 h-48 rounded-full object-cover border-2 border-blue-600'
                    />
                </div>
            </div>

            {/* عرض بيانات الملف الشخصي */}
            <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-6'>
                <div className="flex justify-center">
                    <Image
                        src={userData?.image ? userData.image : img}
                        alt='Member Profile'
                        width={300}
                        height={300}
                        className='w-64 h-64 md:w-80 md:h-80 border-4 border-blue-600 rounded-full object-cover'
                    />
                </div>

                <div className='grid grid-cols-1 gap-3'>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Name:</span> {userData.fullName}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Phone Number:</span> {userData.fullNumber}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize font-bold'>Status:</span> {userData.isActive ? "Available" : "Canceled"}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 mt-4">
                        <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer'>
                            <Trash2Fill /> Delete User
                        </button>

                        <button 
                            onClick={() => {
                                setNewUser({
                                    fullName: userData.fullName,
                                    fullNumber: userData.fullNumber,
                                    id: userData.id,
                                    image: userData.image,
                                    isActive: userData.isActive
                                })
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