
"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
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
    GenderAmbiguous,
    Link45deg
} from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

const DEFAULT_IMAGE_PATH = "/images/st-george-killing-dragon.png"

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
    nfcUrl?: string;
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
    nfcUrl: "",
    role: "",
    isActive: false,
    ageGroup: "غير محدد",
    gender: "Male",
    subscriptionName: "لا يوجد اشتراك نشط",
    createdAt: "غير محدد",
    expirationDate: "غير محدد"
}

// دالة مساعدة لتحويل قيمة ageGroup القادمة من الباك إند إلى نص للعرض بالواجهة
const parseAgeGroupToString = (val?: string | number): string => {
    if (val === undefined || val === null || val === "") return "غير محدد"
    const strVal = String(val).trim()
    if (strVal === "0" || strVal.includes("ابتدائي")) return "ابتدائي"
    if (strVal === "1" || strVal.includes("إعدادي")) return "إعدادي"
    if (strVal === "2" || strVal.includes("ثانوي")) return "ثانوي"
    if (strVal === "3" || strVal.includes("خرجين") || strVal.includes("شباب")) return "شباب وخريجين"
    return strVal
}

// دالة مساعدة لتحويل قيمة ageGroup النصية الحالية إلى رقم لإرسالها للباك إند وتحديدها بالـ Select
const parseAgeGroupToNumber = (val: string | number): number => {
    const strVal = String(val).trim()
    if (strVal === "0" || strVal.includes("ابتدائي")) return 0
    if (strVal === "1" || strVal.includes("إعدادي")) return 1
    if (strVal === "2" || strVal.includes("ثانوي")) return 2
    if (strVal === "3" || strVal.includes("خرجين") || strVal.includes("شباب")) return 3
    const parsed = Number(val)
    return isNaN(parsed) ? 0 : parsed
}

export default function ViewProfilePage({ member }: { member?: Partial<ExtendedMemberType> }) {
    const { theme } = useThemeContext()
    const router = useRouter()

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isAdminUser, setIsAdminUser] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [edit, setEdit] = useState<boolean>(false)
    const [userData, setUserData] = useState<ExtendedMemberType>({ ...defaultMember, ...member })

    const [formData, setFormData] = useState({
        id: "",
        fullName: "",
        fullNumber: "",
        email: "",
        ageGroup: 0,
        gender: 0,
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

                setIsAdminUser(isAdmin)

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
                        const isMale = rawGender === "0" || rawGender === "1" ? rawGender === "0" : rawGender.toLowerCase() === "male"

                        const fetchedUser: ExtendedMemberType = {
                            id: data.id || userIdToFetch,
                            fullName: data.fullName || "",
                            fullNumber: data.phoneNumber || "",
                            email: data.email || "",
                            isActive: data.isActive ?? false,
                            image: data.photoUrl ? `${data.photoUrl}?t=${new Date().getTime()}` : "",
                            nfcUrl: data.nfcUrl || "",
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
    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    // ✏️ 3. فتح وتعبئة مودال التعديل بالقيم الحالية القادمة من userData
    const openEditModal = () => {
        setFormData({
            id: userData.id,
            fullName: userData.fullName || "",
            fullNumber: userData.fullNumber || "",
            email: userData.email || "",
            ageGroup: parseAgeGroupToNumber(userData.ageGroup),
            gender: userData.gender === "Male" ? 0 : 1,
            imageFile: null,
            imagePreview: userData.image || ""
        })
        setEdit(true)
    }

    // 💾 4. دالة التعديل (PUT) والتحديث المباشر للـ State
    const handleEdit = async (e: FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
            alert("❌ جلسة تسجيل الدخول انتهت، يرجى إعادة تسجيل الدخول.")
            return
        }

        let currentId = formData.id || userData.id
        if (!currentId || String(currentId).trim() === "") {
            try {
                const decoded: DecodedToken = jwtDecode(token)
                currentId = (
                    decoded["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/nameidentifier"] ||
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

        try {
            const data = new FormData()
            data.append("Id", cleanId)
            data.append("id", cleanId)
            data.append("FullName", formData.fullName?.trim() || userData.fullName)
            data.append("PhoneNumber", formData.fullNumber?.trim() || userData.fullNumber)
            data.append("Email", formData.email?.trim() || userData.email)
            data.append("AgeGroup", String(formData.ageGroup))
            data.append("Gender", String(formData.gender))

            if (formData.imageFile) {
                data.append("PhotoUrl", formData.imageFile)
                data.append("Photo", formData.imageFile)
            }

            const res = await fetch(`https://mahinproject.runasp.net/api/User/update-user/${cleanId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })

            if (res.ok) {
                const updatedBackendData = await res.json().catch(() => null)

                setUserData(prev => {
                    const newAgeGroupVal = updatedBackendData?.ageGroup ?? updatedBackendData?.AgeGroup ?? formData.ageGroup
                    const newGenderVal = updatedBackendData?.gender ?? updatedBackendData?.Gender ?? formData.gender

                    const returnedPhoto = updatedBackendData?.photoUrl || updatedBackendData?.PhotoUrl
                    const finalPhoto = returnedPhoto 
                        ? `${returnedPhoto}?t=${new Date().getTime()}` 
                        : (formData.imagePreview || prev.image)

                    return {
                        ...prev,
                        fullName: updatedBackendData?.fullName || updatedBackendData?.FullName || formData.fullName,
                        fullNumber: updatedBackendData?.phoneNumber || updatedBackendData?.PhoneNumber || formData.fullNumber,
                        email: updatedBackendData?.email || updatedBackendData?.Email || formData.email,
                        ageGroup: parseAgeGroupToString(newAgeGroupVal),
                        gender: String(newGenderVal) === "0" || String(newGenderVal).toLowerCase() === "male" ? "Male" : "Female",
                        image: finalPhoto
                    }
                })

                alert("تم حفظ التعديلات بنجاح! ✅")
                setEdit(false)
            } else {
                const responseData = await res.text()
                console.error("Backend Error Response:", responseData)
                alert(`فشل التحديث من الباك إند (${res.status}):\n${responseData}`)
            }
        } catch (error: unknown) {
            console.error("Fetch Error Details:", error)
            const errMessage = error instanceof Error ? error.message : "يرجى التحقق من استجابة السيرفر"
            alert(`حدث خطأ أثناء الاتصال بالباك إند:\n${errMessage}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    // 🗑️ 5. حذف المستخدم
    const handleDelete = async () => {
        const targetId = userData.id?.trim()

        if (!targetId) {
            alert("❌ تعذر العثور على معرّف المستخدم (ID) للحذف.")
            return
        }

        if (!confirm("⚠️ هل أنت متأكد من رغبتك في حذف هذا المستخدم نهائياً؟")) {
            return
        }

        const token = localStorage.getItem("token")
        if (!token) {
            alert("❌ انتهت جلسة تسجيل الدخول، يرجى إعادة الدخول.")
            router.replace('/')
            return
        }

        setIsSubmitting(true)

        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/User/delete-user/${targetId}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                alert("تم حذف المستخدم بنجاح! 🗑️")

                let currentUserId = ""
                try {
                    const decoded = jwtDecode(token) as DecodedToken
                    currentUserId = (
                        decoded["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/nameidentifier"] ||
                        decoded.nameid ||
                        decoded.sub ||
                        ""
                    ) as string
                } catch (e) {
                    console.error("Error decoding token on delete:", e)
                }

                if (targetId === currentUserId) {
                    localStorage.removeItem("token")
                    router.replace('/')
                } else {
                    router.push('/dashboard/members')
                }
            } else {
                const errorData = await res.text()
                console.error("Delete Error Response:", errorData)
                alert(`❌ فشل حذف المستخدم من السيرفر (${res.status}):\n${errorData || "يرجى التأكد من الصلاحيات"}`)
            }
        } catch (error: unknown) {
            console.error("Delete Fetch Error:", error)
            const errMessage = error instanceof Error ? error.message : "حدث خطأ أثناء الاتصال بالباك إند"
            alert(`❌ تعذر إكمال عملية الحذف:\n${errMessage}`)
        } finally {
            setIsSubmitting(false)
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
                                <img
                                    src={formData.imagePreview && formData.imagePreview.trim() !== "" ? formData.imagePreview : DEFAULT_IMAGE_PATH}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH
                                    }}
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
                                <option value={3}>شباب وخريجين (3)</option>
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
                                <option value={0}>ذكر (0)</option>
                                <option value={1}>أنثى (1)</option>
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
                        <img
                            src={userData?.image && userData.image.trim() !== "" ? userData.image : DEFAULT_IMAGE_PATH}
                            alt={userData?.fullName || 'User Profile'}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH
                            }}
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

                    {/* 🔐 بوكس رابط الـ NFC - يظهر للأدمن فقط */}
                    {isAdminUser && (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700">
                            <Link45deg className="text-blue-600 text-2xl flex-shrink-0" />
                            <div className="overflow-hidden w-full">
                                <p className="text-xs text-gray-500 dark:text-gray-400">رابط NFC (خاص بالمدير)</p>
                                {userData?.nfcUrl ? (
                                    <a 
                                        href={userData.nfcUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-sm font-bold text-blue-600 hover:underline truncate block transition-all"
                                    >
                                        {userData.nfcUrl}
                                    </a>
                                ) : (
                                    <h4 className="text-sm font-bold text-gray-400">غير متوفر</h4>
                                )}
                            </div>
                        </div>
                    )}

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
                            disabled={isSubmitting}
                            className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-all cursor-pointer shadow-md shadow-blue-600/20 disabled:bg-gray-400'
                        >
                            <PenFill /> تعديل البيانات الأساسية
                        </button>

                        <button 
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className='flex items-center w-full p-3.5 rounded-2xl justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all cursor-pointer shadow-md shadow-red-600/20 disabled:bg-gray-400'
                        >
                            <Trash2Fill /> {isSubmitting ? "جاري الحذف..." : "حذف المستخدم"}
                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}