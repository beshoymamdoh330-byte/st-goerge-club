"use client"
import Image from 'next/image'
import { memberType, NewUser,  } from '../assets/assets'
import { useState } from 'react'
import { useThemeContext } from '../assets/contexts'
import { PenFill, Trash2Fill } from 'react-bootstrap-icons'
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
        image:userData.image
    })


    // دالة حفظ التعديلات وإرسالها للـ Database
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            //  مكان طلب الـ API المستقبلي (مثال مع axios/fetch):
            /*
            const res = await fetch(/api/users/${userData.id}, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            const data = await res.json()
            */

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
        } finally {
            // setLoading(false)
        }
    }

    return (
        <>
        <main className={w-full bg-fixed py-5 pt-25 px-5 md:px-20 min-h-screen ${theme === "light" ? "light-mode" : "dark-mode"}}>
            
            {/* Form التعديل */}
            <div className={items-center ${edit ? "grid" : "hidden"} gap-2.5 p-3 mb-10 ${theme==="light"?"bg-gray-200 text-black" :"bg-gray-800 text-white"} rounded-3xl border-b-4 border-r-4 border-blue-600 grid-cols-1 md:grid-cols-2}>
                <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
                    <input
                        onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                        className='p-3 rounded-2xl border border-blue-600 focus:bg-blue-500'
                        type="text"
                        value={newUser.fullName}
                        required
                    />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, fullNumber: e.target.value })}
                        className='p-3 rounded-2xl border border-blue-600 focus:bg-blue-500'
                        type="email"
                        value={newUser.fullNumber}
                        required
                    />
                    <input
                        onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                        className='p-3 rounded-2xl border border-blue-600 focus:bg-blue-500'
                        type="password"
                        value={newUser.id}
                        required
                    />
                    <button 
                        type="submit" 
                        className='  col-span-1 md:col-span-2 p-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-gray-400'
                    >
                        save changes
                    </button>
                </form>
                <div className="flex items-center justify-center flex-col gap-2.5">
                    <Image
                        src={userData?.image ? userData.image:img}
                        alt='img'
                        width={300}
                        height={300}
                        className='w-90 h-75 rounded-full'
                    />
                </div>
            </div>
            {/* عرض بيانات الملف الشخصي */}
            <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-2.5'>
                <Image
                    src={userData?.image ? userData.image:img}
                    alt='img'
                    width={300}
                    height={300}
                    className='w-full md:w-100 md:h-100 border-2 border-blue-600 rounded-full'
                />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize'>name:</span> {userData.fullName}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize'>phone number:</span> {userData.fullNumber}</h3>
                    <h3 className='text-2xl text-blue-600 mb-2'><span className='capitalize'>status:</span> {userData.isActive?"available":"canceled"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2.5 col-span-1 md:col-span-2">
                        <button className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-red-600 text-white transition-colors'>
                            <Trash2Fill /> delete user
                        </button>
                        <button 
                            onClick={() => {
                                setNewUser({
                                    fullName: userData.fullName,
                                    fullNumber: userData.fullNumber,
                                    id: userData.id,
                                    image: userData.image,
                                    isActive : userData.isActive
                                })
                                setEdit(true)
                            }} 
                            className='flex items-center w-full p-3 rounded-2xl justify-center gap-2.5 bg-blue-600 hover:bg-blue-800 text-white transition-colors'
                        >
                            <PenFill /> edit user
                        </button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}