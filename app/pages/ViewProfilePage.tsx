

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
    Link45deg,
    ExclamationTriangleFill,
    PlusCircleFill,
    CheckCircleFill,
    PersonBadgeFill
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

export interface SubscriptionPlan {
    id: number;
    name: string;
    targetAgeGroup: number;
    price: number;
    durationInDays: number;
    isActive: boolean;
}

// رد الباك عند جلب بيانات اليوزر (GET) - بيرجع الاشتراك النشط
// الحقول مفتوحة الاحتمالات لحد ما الباك يثبت اسم موحد لحقل الـ id بتاع الاشتراك
export interface ActiveSubscriptionDto {
    id?: number;
    Id?: number;
    subscriptionId?: number;
    SubscriptionId?: number;
    activeSubscriptionId?: number;
    ActiveSubscriptionId?: number;
    userSubscriptionId?: number;
    UserSubscriptionId?: number;
    subscriptionPlanId?: number;
    SubscriptionPlanId?: number;
    planName?: string;
    PlanName?: string;
    price?: number;
    Price?: number;
    startDate?: string;
    StartDate?: string;
    endDate?: string;
    EndDate?: string;
    isActive?: boolean;
    IsActive?: boolean;
    [key: string]: unknown; // fallback لأي حقل غير متوقع
}

// رد الباك عند تفعيل اشتراك جديد (POST /Subscription/subscribe) - PascalCase
export interface SubscribeApiResponse {
    Id?: number;
    id?: number;
    UserId?: string;
    userId?: string;
    UserName?: string;
    userName?: string;
    UserPhoneNumber?: string;
    userPhoneNumber?: string;
    SubscriptionPlanId?: number;
    subscriptionPlanId?: number;
    PlanName?: string;
    planName?: string;
    Price?: number;
    price?: number;
    StartDate?: string;
    startDate?: string;
    EndDate?: string;
    endDate?: string;
    IsActive?: boolean;
    isActive?: boolean;
}

// رد الباك عند جلب كل الرولز (GET /Roles/get-all-role)
export interface RoleDto {
    id?: string | number;
    Id?: string | number;
    roleId?: string | number;
    RoleId?: string | number;
    name?: string;
    Name?: string;
    roleName?: string;
    RoleName?: string;
    [key: string]: unknown;
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
    subscriptionId?: number;
    hasActiveSubscription: boolean;
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
    subscriptionId: undefined,
    hasActiveSubscription: false,
    createdAt: "غير محدد",
    expirationDate: "غير محدد"
}

const parseAgeGroupToString = (val?: string | number): string => {
    if (val === undefined || val === null || val === "") return "غير محدد"
    const strVal = String(val).trim()
    if (strVal === "0" || strVal.includes("ابتدائي")) return "ابتدائي"
    if (strVal === "1" || strVal.includes("إعدادي")) return "إعدادي"
    if (strVal === "2" || strVal.includes("ثانوي")) return "ثانوي"
    if (strVal === "3" || strVal.includes("خرجين") || strVal.includes("شباب")) return "شباب وخريجين"
    return strVal
}

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

    // 🌟 States خاصة بإدارة الاشتراكات للـ Admin
    const [showSubModal, setShowSubModal] = useState<boolean>(false)
    const [plans, setPlans] = useState<SubscriptionPlan[]>([])
    const [loadingPlans, setLoadingPlans] = useState<boolean>(false)
    const [activatingPlanId, setActivatingPlanId] = useState<number | null>(null)
    const [isCancelling, setIsCancelling] = useState<boolean>(false)

    // 🌟 States خاصة بإدارة الرول للـ Admin
    const [showRoleModal, setShowRoleModal] = useState<boolean>(false)
    const [roles, setRoles] = useState<RoleDto[]>([])
    const [loadingRoles, setLoadingRoles] = useState<boolean>(false)
    const [updatingRoleId, setUpdatingRoleId] = useState<string | number | null>(null)

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

                        // الباك ممكن يرجع الحقول بحروف كبيرة أو صغيرة، وممكن يسمي حقل الـ id
                        // بأي اسم من دول - بنجرب كل الاحتمالات المعروفة
                        const subId =
                            sub?.id ??
                            sub?.Id ??
                            sub?.subscriptionId ??
                            sub?.SubscriptionId ??
                            sub?.activeSubscriptionId ??
                            sub?.ActiveSubscriptionId ??
                            sub?.userSubscriptionId ??
                            sub?.UserSubscriptionId ??
                            undefined

                        const subPlanName = sub?.planName ?? sub?.PlanName
                        const subPrice = sub?.price ?? sub?.Price
                        const subStartDate = sub?.startDate ?? sub?.StartDate
                        const subEndDate = sub?.endDate ?? sub?.EndDate
                        const subIsActive = sub?.isActive ?? sub?.IsActive

                        const formattedStartDate = subStartDate 
                            ? new Date(subStartDate as string).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) 
                            : "غير محدد"

                        const formattedEndDate = subEndDate 
                            ? new Date(subEndDate as string).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) 
                            : "غير محدد"

                        const hasSub = Boolean(sub && subPlanName && (subIsActive ?? true))

                        const subscriptionTitle = hasSub
                            ? `${subPlanName} (${subPrice} ج.م)` 
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
                            subscriptionId: hasSub ? subId : undefined,
                            hasActiveSubscription: hasSub,
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

    // 📋 جلب قايمة خطط الاشتراكات عند فتح المودال
    const handleOpenSubModal = async () => {
        setShowSubModal(true)
        if (plans.length > 0) return

        setLoadingPlans(true)
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Subscription/get-all-plans", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                setPlans(data)
            } else {
                alert("❌ فشل في جلب خطط الاشتراكات")
            }
        } catch (error) {
            console.error("Error fetching plans:", error)
            alert("❌ حدث خطأ أثناء الاتصال بالسيرفر لجلب الخطط")
        } finally {
            setLoadingPlans(false)
        }
    }

    // ⚡ تفعيل خطة اشتراك للمستخدم (POST /Subscription/subscribe)
    const handleActivatePlan = async (plan: SubscriptionPlan) => {
        const token = localStorage.getItem("token")
        if (!token) return

        if (!confirm(`هل أنت متأكد من تفعيل خطة (${plan.name}) لهذا المستخدم؟`)) return

        setActivatingPlanId(plan.id)

        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Subscription/subscribe", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userData.id,
                    subscriptionPlanId: plan.id,
                    pricePaid: plan.price
                })
            })

            if (res.ok) {
                const createdSub: SubscribeApiResponse = await res.json()

                // الباك بيرجع الحروف الكبيرة (PascalCase) - مع fallback للحروف الصغيرة للأمان
                const newSubId = createdSub.Id ?? createdSub.id
                const newPlanName = createdSub.PlanName ?? createdSub.planName ?? plan.name
                const newPrice = createdSub.Price ?? createdSub.price ?? plan.price
                const newStartDate = createdSub.StartDate ?? createdSub.startDate
                const newEndDate = createdSub.EndDate ?? createdSub.endDate
                const newIsActive = createdSub.IsActive ?? createdSub.isActive ?? true

                const formattedStartDate = newStartDate
                    ? new Date(newStartDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
                    : "غير محدد"

                const formattedEndDate = newEndDate
                    ? new Date(newEndDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
                    : "غير محدد"

                alert("تم تفعيل الاشتراك بنجاح! 🎉")

                setUserData(prev => ({
                    ...prev,
                    hasActiveSubscription: newIsActive,
                    subscriptionName: `${newPlanName} (${newPrice} ج.م)`,
                    subscriptionId: newSubId,
                    createdAt: formattedStartDate,
                    expirationDate: formattedEndDate
                }))

                setShowSubModal(false)
            } else {
                const errText = await res.text()
                alert(`❌ فشل تفعيل الاشتراك: ${errText || res.statusText}`)
            }
        } catch (error) {
            console.error("Error activating subscription:", error)
            alert("❌ حدث خطأ في الاتصال بالسيرفر لتفعيل الاشتراك")
        } finally {
            setActivatingPlanId(null)
        }
    }

    // 🛑 إلغاء الاشتراك الحالي (PUT /Subscription/cancel-Subscription/{subscriptionId})
    // بيستخدم الـ id اللي راجع من الباك وقت التفعيل أو من بيانات اليوزر عند الفتش
    const handleCancelSubscription = async () => {
        if (!userData.subscriptionId) {
            alert("❌ لا يوجد اشتراك نشط لإلغائه.")
            return
        }

        if (!confirm("⚠️ هل أنت متأكد من إلغاء اشتراك هذا المستخدم؟")) return

        const token = localStorage.getItem("token")
        if (!token) return

        setIsCancelling(true)

        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/Subscription/cancel-Subscription/${userData.subscriptionId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                alert("تم إلغاء الاشتراك بنجاح! ✅")
                setUserData(prev => ({
                    ...prev,
                    hasActiveSubscription: false,
                    subscriptionName: "لا يوجد اشتراك نشط",
                    subscriptionId: undefined,
                    createdAt: "غير محدد",
                    expirationDate: "غير محدد"
                }))
            } else {
                const errText = await res.text()
                alert(`❌ فشل إلغاء الاشتراك: ${errText || res.statusText}`)
            }
        } catch (error) {
            console.error("Error cancelling subscription:", error)
            alert("❌ حدث خطأ في الاتصال بالسيرفر لإلغاء الاشتراك")
        } finally {
            setIsCancelling(false)
        }
    }

    // 📋 جلب قايمة الرولز المتاحة (GET /Roles/get-all-role)
    const handleOpenRoleModal = async () => {
        setShowRoleModal(true)
        if (roles.length > 0) return

        setLoadingRoles(true)
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Roles/get-all-role", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                setRoles(data)
            } else {
                alert("❌ فشل في جلب قائمة الرولز")
            }
        } catch (error) {
            console.error("Error fetching roles:", error)
            alert("❌ حدث خطأ أثناء الاتصال بالسيرفر لجلب الرولز")
        } finally {
            setLoadingRoles(false)
        }
    }

    // ⚡ تغيير رول المستخدم (PUT /Roles/update-user-role)
    const handleUpdateRole = async (role: RoleDto) => {
        const token = localStorage.getItem("token")
        if (!token) return

        const roleId = role.id ?? role.Id ?? role.roleId ?? role.RoleId
        const roleName = role.name ?? role.Name ?? role.roleName ?? role.RoleName ?? ""

        if (roleId === undefined || roleId === null) {
            alert("❌ تعذر تحديد معرّف الرول المختار.")
            return
        }

        if (!confirm(`هل أنت متأكد من تغيير رول هذا المستخدم إلى (${roleName})؟`)) return

        setUpdatingRoleId(roleId)

        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Roles/update-user-role", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userData.id,
                    roleId: String(roleId)
                })
            })

            if (res.ok) {
                alert("تم تغيير الرول بنجاح! 🎉")
                setUserData(prev => ({
                    ...prev,
                    role: roleName || prev.role
                }))
                setShowRoleModal(false)
            } else {
                const errText = await res.text()
                alert(`❌ فشل تغيير الرول: ${errText || res.statusText}`)
            }
        } catch (error) {
            console.error("Error updating role:", error)
            alert("❌ حدث خطأ في الاتصال بالسيرفر لتغيير الرول")
        } finally {
            setUpdatingRoleId(null)
        }
    }

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
                        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier"] ||
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

    const mainBorderClass = userData.hasActiveSubscription ? "border-blue-600" : "border-red-600"
    const accentTextClass = userData.hasActiveSubscription ? "text-blue-600" : "text-red-600"
    const actionBgClass = userData.hasActiveSubscription ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
    const focusRingClass = userData.hasActiveSubscription ? "focus:ring-blue-500" : "focus:ring-red-500"

    return (
        <main className={`w-full py-10 pt-28 px-5 md:px-20 min-h-screen transition-colors ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-white"}`}>

            {!userData.hasActiveSubscription && (
                <div className="mb-6 p-4 rounded-2xl bg-red-600 text-white shadow-lg flex items-center gap-3 border border-red-700 animate-bounce">
                    <ExclamationTriangleFill className="text-2xl flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-lg">عذراً، برجاء الاشتراك</h3>
                        <p className="text-sm text-red-100">لا يوجد اشتراك نشط لهذا الحساب حالياً. يرجى تجديد الاشتراك للاستفادة من كامل الخدمات.</p>
                    </div>
                </div>
            )}

            {/* 📝 مودال تفعيل الاشتراك للأدمن */}
            {showSubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-2xl p-6 rounded-3xl border-2 border-green-600 shadow-2xl relative max-h-[85vh] overflow-y-auto ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                        <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-green-600 flex items-center gap-2">
                                <PlusCircleFill />
                                تفعيل اشتراك للمستخدم: {userData.fullName}
                            </h3>
                            <button onClick={() => setShowSubModal(false)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 transition-all cursor-pointer">
                                <XLg size={16} />
                            </button>
                        </div>

                        {loadingPlans ? (
                            <div className="text-center py-10 font-bold text-green-600 animate-pulse">
                                جاري تحميل الخطط المتاحة...
                            </div>
                        ) : plans.length === 0 ? (
                            <p className="text-center py-6 text-gray-500">لا توجد خطط اشتراك متاحة حالياً.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {plans.map((plan) => (
                                    <div 
                                        key={plan.id}
                                        className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                                            plan.isActive 
                                                ? "border-green-500/50 bg-green-50/20 dark:bg-green-950/20 hover:border-green-600" 
                                                : "border-gray-300 opacity-60"
                                        }`}
                                    >
                                        <div>
                                            <h4 className="font-bold text-lg text-green-600 dark:text-green-400 mb-1">{plan.name}</h4>
                                            <p className="text-2xl font-black mb-2">{plan.price} <span className="text-sm font-normal">ج.م</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                المرحلة المستهدفة: {parseAgeGroupToString(plan.targetAgeGroup)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                المدة: {plan.durationInDays} يوم
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleActivatePlan(plan)}
                                            disabled={!plan.isActive || activatingPlanId === plan.id}
                                            className="w-full py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all disabled:bg-gray-400 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <CheckCircleFill size={16} />
                                            <span>{activatingPlanId === plan.id ? "جاري التفعيل..." : "تفعيل هذا الاشتراك"}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 📝 مودال تغيير الرول للأدمن */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md p-6 rounded-3xl border-2 border-purple-600 shadow-2xl relative max-h-[85vh] overflow-y-auto ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                        <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                                <PersonBadgeFill />
                                تغيير رول: {userData.fullName}
                            </h3>
                            <button onClick={() => setShowRoleModal(false)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 transition-all cursor-pointer">
                                <XLg size={16} />
                            </button>
                        </div>

                        {loadingRoles ? (
                            <div className="text-center py-10 font-bold text-purple-600 animate-pulse">
                                جاري تحميل الرولز المتاحة...
                            </div>
                        ) : roles.length === 0 ? (
                            <p className="text-center py-6 text-gray-500">لا توجد رولز متاحة حالياً.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {roles.map((role) => {
                                    const roleId = role.id ?? role.Id ?? role.roleId ?? role.RoleId
                                    const roleName = role.name ?? role.Name ?? role.roleName ?? role.RoleName ?? "بدون اسم"
                                    const isCurrentRole = String(roleName).toLowerCase() === String(userData.role).toLowerCase()

                                    return (
                                        <button
                                            key={String(roleId)}
                                            onClick={() => handleUpdateRole(role)}
                                            disabled={isCurrentRole || updatingRoleId === roleId}
                                            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-between gap-2 cursor-pointer border ${
                                                isCurrentRole
                                                    ? "bg-purple-100 dark:bg-purple-950/40 border-purple-400 text-purple-700 dark:text-purple-300 cursor-not-allowed"
                                                    : "bg-purple-600 hover:bg-purple-700 text-white border-purple-600 disabled:bg-gray-400"
                                            }`}
                                        >
                                            <span>{String(roleName)}</span>
                                            <span className="text-xs">
                                                {isCurrentRole ? "الرول الحالي" : (updatingRoleId === roleId ? "جاري التغيير..." : "اختيار")}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 📝 نموذج التعديل */}
            {edit && (
                <div className={`p-6 mb-10 border-2 ${mainBorderClass} rounded-3xl relative shadow-xl ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-300 dark:border-gray-700">
                        <h2 className={`text-2xl font-bold ${accentTextClass}`}>تعديل بيانات المستخدم</h2>
                        <button type="button" onClick={() => setEdit(false)} className={`p-2 ${actionBgClass} text-white rounded-full transition-all cursor-pointer`}>
                            <XLg size={16} />
                        </button>
                    </div>

                    <form onSubmit={handleEdit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        <div className={`col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 border-2 border-dashed ${userData.hasActiveSubscription ? "border-blue-400" : "border-red-400"} rounded-2xl mb-2`}>
                            <div className={`relative w-28 h-28 rounded-full overflow-hidden border-2 ${mainBorderClass} mb-3 shadow-md`}>
                                <img
                                    src={formData.imagePreview && formData.imagePreview.trim() !== "" ? formData.imagePreview : DEFAULT_IMAGE_PATH}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH
                                    }}
                                />
                            </div>

                            <label className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${actionBgClass} text-white font-semibold text-sm cursor-pointer shadow-md transition-all`}>
                                <CloudUploadFill size={18} />
                                <span>اختيار صورة جديدة</span>
                                <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                            </label>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">الاسم بالكامل</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className={`w-full p-3 rounded-2xl border ${mainBorderClass} outline-none text-black dark:text-white bg-transparent focus:ring-2 ${focusRingClass}`}
                                type="text"
                                value={formData.fullName}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">رقم الهاتف</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, fullNumber: e.target.value })}
                                className={`w-full p-3 rounded-2xl border ${mainBorderClass} outline-none text-black dark:text-white bg-transparent focus:ring-2 ${focusRingClass}`}
                                type="text"
                                value={formData.fullNumber}
                                required
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="text-sm font-semibold mb-1 block">البريد الإلكتروني</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full p-3 rounded-2xl border ${mainBorderClass} outline-none text-black dark:text-white bg-transparent focus:ring-2 ${focusRingClass}`}
                                type="email"
                                value={formData.email}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">المرحلة العمرية (Age Group)</label>
                            <select
                                value={formData.ageGroup}
                                onChange={(e) => setFormData({ ...formData, ageGroup: Number(e.target.value) })}
                                className={`w-full p-3 rounded-2xl border ${mainBorderClass} outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 ${focusRingClass}`}
                            >
                                <option value={0}>ابتدائي (0)</option>
                                <option value={1}>إعدادي (1)</option>
                                <option value={2}>ثانوي (2)</option>
                                <option value={3}>شباب وخريجين (3)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1 block">النوع (Gender)</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: Number(e.target.value) })}
                                className={`w-full p-3 rounded-2xl border ${mainBorderClass} outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 ${focusRingClass}`}
                            >
                                <option value={0}>ذكر (0)</option>
                                <option value={1}>أنثى (1)</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`col-span-1 md:col-span-2 p-3.5 mt-2 rounded-2xl ${actionBgClass} text-white font-bold transition-all disabled:bg-gray-500 cursor-pointer shadow-lg`}
                        >
                            {isSubmitting ? "جاري إرسال التعديلات للسيرفر..." : "حفظ التعديلات"}
                        </button>
                    </form>
                </div>
            )}

            {/* 👤 عرض البروفايل */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 rounded-3xl border-2 ${mainBorderClass} shadow-xl ${theme === "light" ? "bg-white" : "bg-gray-900 text-white"}`}>

                <div className="flex flex-col items-center justify-center col-span-1">
                    <div className={`relative w-48 h-48 md:w-60 md:h-60 border-4 ${mainBorderClass} rounded-full overflow-hidden shadow-lg mb-4`}>
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

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <PersonFill className={`${accentTextClass} text-2xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">الاسم بالكامل</p>
                            <h4 className="text-lg font-bold">{userData?.fullName || "غير مدخل"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <TelephoneFill className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">رقم الهاتف</p>
                            <h4 className="text-lg font-bold">{userData?.fullNumber || "غير مدخل"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <EnvelopeFill className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div className="overflow-hidden">
                            <p className="text-xs text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                            <h4 className="text-base font-bold truncate">{userData?.email || "غير مدخل"}</h4>
                        </div>
                    </div>

                    {isAdminUser && (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <Link45deg className={`${accentTextClass} text-2xl flex-shrink-0`} />
                            <div className="overflow-hidden w-full">
                                <p className="text-xs text-gray-500 dark:text-gray-400">رابط NFC (خاص بالمدير)</p>
                                {userData?.nfcUrl ? (
                                    <a 
                                        href={userData.nfcUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`text-sm font-bold ${accentTextClass} hover:underline truncate block transition-all`}
                                    >
                                        {userData.nfcUrl}
                                    </a>
                                ) : (
                                    <h4 className="text-sm font-bold text-gray-400">غير متوفر</h4>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <GenderAmbiguous className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">النوع</p>
                            <h4 className="text-lg font-bold">{userData?.gender === "Male" ? "ذكر" : "أنثى"}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <HourglassSplit className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">المرحلة</p>
                            <h4 className="text-lg font-bold">{userData?.ageGroup}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <ShieldCheck className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">الصلاحية (Role)</p>
                            <h4 className="text-lg font-bold">{userData?.role}</h4>
                        </div>
                    </div>

                    <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${userData.hasActiveSubscription ? "bg-blue-50/30 dark:bg-gray-800/50 border-blue-200 dark:border-gray-700" : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900"}`}>
                        <CardChecklist className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">باقة الاشتراك</p>
                            <h4 className={`text-lg font-bold ${accentTextClass}`}>
                                {userData?.subscriptionName}
                            </h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <CalendarCheckFill className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ بداية الاشتراك</p>
                            <h4 className="text-lg font-bold">{userData?.createdAt}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <CalendarEventFill className={`${accentTextClass} text-xl flex-shrink-0`} />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ نهاية الاشتراك</p>
                            <h4 className="text-lg font-bold">{userData?.expirationDate}</h4>
                        </div>
                    </div>

                </div>

                {/* 🛠️ أزرار التحكم */}
                <div className="col-span-1 md:col-span-3 flex flex-wrap justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    
                    {/* 🌟 زر تفعيل الاشتراك للأدمن فقط */}
                    {isAdminUser && (
                        <button
                            type="button"
                            onClick={handleOpenSubModal}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-all cursor-pointer shadow-md"
                        >
                            <PlusCircleFill size={16} />
                            <span>تفعيل اشتراك</span>
                        </button>
                    )}

                    {/* 🛑 زر إلغاء الاشتراك للأدمن، بيظهر بس لو فيه اشتراك نشط */}
                    {isAdminUser && userData.hasActiveSubscription && (
                        <button
                            type="button"
                            onClick={handleCancelSubscription}
                            disabled={isCancelling}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-all disabled:bg-gray-500 cursor-pointer shadow-md"
                        >
                            <XLg size={16} />
                            <span>{isCancelling ? "جاري الإلغاء..." : "إلغاء الاشتراك"}</span>
                        </button>
                    )}

                    {/* 👑 زر تغيير الرول للأدمن فقط */}
                    {isAdminUser && (
                        <button
                            type="button"
                            onClick={handleOpenRoleModal}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-all cursor-pointer shadow-md"
                        >
                            <PersonBadgeFill size={16} />
                            <span>تغيير الرول</span>
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={openEditModal}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all cursor-pointer shadow-md"
                    >
                        <PenFill size={16} />
                        <span>تعديل البيانات</span>
                    </button>

                    {isAdminUser && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all disabled:bg-gray-500 cursor-pointer shadow-md"
                        >
                            <Trash2Fill size={16} />
                            <span>حذف المستخدم</span>
                        </button>
                    )}
                </div>

            </div>
        </main>
    )
}
