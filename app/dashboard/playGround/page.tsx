"use client"
import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react'
import { useThemeContext } from  '@/app/assets/contexts'
import {
    CloudUploadFill,
    TagFill,
    CardText,
    Grid3x3GapFill,
    PeopleFill,
    CashCoin,
    ToggleOn,
    ToggleOff,
    CheckCircleFill,
    ExclamationTriangleFill,
    PlusCircleFill,
    Grid3x3GapFill as ListIcon,
    PenFill,
    XLg
} from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

const DEFAULT_IMAGE_PATH = "/images/st-george-killing-dragon.png"

interface DecodedToken {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
    role?: string | string[];
    [key: string]: unknown;
}

// نفس الـ enum بتاع الباك إند - لازم القيم تفضل مطابقة تمامًا
enum PlaygroundType {
    Football = 1,
    Volleyball = 2,
    PingPong = 3,
    Basketball = 4,
    Tennis = 5,
    Domino = 6,
    Chess = 7,
    Hockey = 8,
    Billiard = 9,
    Tawla = 10
}

const playgroundTypeOptions: { value: PlaygroundType; label: string }[] = [
    { value: PlaygroundType.Football, label: "كرة قدم" },
    { value: PlaygroundType.Volleyball, label: "كرة طائرة" },
    { value: PlaygroundType.PingPong, label: "تنس طاولة (بينج بونج)" },
    { value: PlaygroundType.Basketball, label: "كرة سلة" },
    { value: PlaygroundType.Tennis, label: "تنس" },
    { value: PlaygroundType.Domino, label: "دومينو" },
    { value: PlaygroundType.Chess, label: "شطرنج" },
    { value: PlaygroundType.Hockey, label: "هوكي" },
    { value: PlaygroundType.Billiard, label: "بلياردو" },
    { value: PlaygroundType.Tawla, label: "طاولة (تاولي)" }
]

// الباك بيرجع نوع اللعبة كنص (اسم الـ enum) وقت العرض (GET) - بنحوله لرقم عشان نقدر نعدل عليه
const playgroundTypeNameToValue = (typeName: string | number): PlaygroundType => {
    if (typeof typeName === "number") return typeName as PlaygroundType
    const found = playgroundTypeOptions.find(
        opt => PlaygroundType[opt.value].toLowerCase() === String(typeName).toLowerCase()
    )
    return found ? found.value : PlaygroundType.Football
}

const playgroundTypeLabel = (value: PlaygroundType): string => {
    const found = playgroundTypeOptions.find(opt => opt.value === value)
    return found ? found.label : "غير معروف"
}

interface PlaygroundApiItem {
    id: number;
    name: string;
    description?: string;
    photoUrl?: string;
    playgroundType: string | number;
    capacity: number;
    hourlyRate: number;
    isActive: boolean;
}

interface PlaygroundFormData {
    name: string;
    description: string;
    playgroundType: PlaygroundType;
    capacity: string;
    hourlyRate: string;
    isActive: boolean;
    imageFile: File | null;
    imagePreview: string;
}

const defaultFormData: PlaygroundFormData = {
    name: "",
    description: "",
    playgroundType: PlaygroundType.Football,
    capacity: "",
    hourlyRate: "",
    isActive: true,
    imageFile: null,
    imagePreview: ""
}

type ViewMode = "list" | "add"

export default function PlaygroundsPage() {
    const { theme } = useThemeContext()
    const router = useRouter()

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [view, setView] = useState<ViewMode>("list")

    // ---- إضافة لعبة ----
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [formData, setFormData] = useState<PlaygroundFormData>(defaultFormData)
    const [errorMessage, setErrorMessage] = useState<string>("")

    // ---- عرض / تعديل الملاعب ----
    const [playgrounds, setPlaygrounds] = useState<PlaygroundApiItem[]>([])
    const [loadingList, setLoadingList] = useState<boolean>(false)
    const [listError, setListError] = useState<string>("")
    const [editingPlayground, setEditingPlayground] = useState<PlaygroundApiItem | null>(null)
    const [editFormData, setEditFormData] = useState<PlaygroundFormData>(defaultFormData)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [editError, setEditError] = useState<string>("")

    useEffect(() => {
        const verify = async () => {
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

                if (!isAdmin) {
                    router.replace('/')
                    return
                }

                setIsAuthorized(true)
            } catch (error) {
                console.error("Token decoding error:", error)
                localStorage.removeItem("token")
                router.replace('/')
            } finally {
                setIsLoading(false)
            }
        }

        verify()
    }, [router])

    const fetchPlaygrounds = useCallback(async () => {
        setLoadingList(true)
        setListError("")
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("https://mahinproject.runasp.net/api/Playground", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data: PlaygroundApiItem[] = await res.json()
                setPlaygrounds(data)
            } else {
                setListError(`فشل في جلب قائمة الملاعب (${res.status})`)
            }
        } catch (error) {
            console.error("Error fetching playgrounds:", error)
            setListError("حدث خطأ أثناء الاتصال بالسيرفر لجلب الملاعب")
        } finally {
            setLoadingList(false)
        }
    }, [])

    useEffect(() => {
        if (isAuthorized && view === "list") {
            fetchPlaygrounds()
        }
    }, [isAuthorized, view, fetchPlaygrounds])

    // ---- منطق إضافة لعبة ----
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

    const resetForm = () => {
        setFormData(defaultFormData)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setErrorMessage("")

        const token = localStorage.getItem("token")
        if (!token) {
            alert("❌ جلسة تسجيل الدخول انتهت، يرجى إعادة تسجيل الدخول.")
            router.replace('/')
            return
        }

        if (!formData.name.trim()) {
            setErrorMessage("من فضلك أدخل اسم اللعبة.")
            return
        }

        if (!formData.imageFile) {
            setErrorMessage("من فضلك اختر صورة للعبة، الصورة مطلوبة.")
            return
        }

        if (!formData.capacity || Number(formData.capacity) <= 0) {
            setErrorMessage("من فضلك أدخل سعة صحيحة للملعب.")
            return
        }

        if (!formData.hourlyRate || Number(formData.hourlyRate) < 0) {
            setErrorMessage("من فضلك أدخل سعر ساعة صحيح.")
            return
        }

        setIsSubmitting(true)

        try {
            const data = new FormData()
            data.append("Name", formData.name.trim())
            data.append("Description", formData.description.trim())
            data.append("PlaygroundType", String(formData.playgroundType))
            data.append("Capacity", String(parseInt(formData.capacity, 10)))
            data.append("HourlyRate", String(parseFloat(formData.hourlyRate)))
            data.append("IsActive", formData.isActive ? "true" : "false")

            if (formData.imageFile) {
                data.append("Photo", formData.imageFile)
            }

            const res = await fetch("https://mahinproject.runasp.net/api/Playground", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })

            if (res.ok) {
                alert("تم إضافة اللعبة بنجاح! 🎉")
                resetForm()
                setView("list")
            } else {
                let fullError = `فشل الإضافة (${res.status})`
                try {
                    const errJson = await res.json()
                    const parts = [errJson?.message, errJson?.details, errJson?.title, errJson?.error]
                        .filter((p): p is string => typeof p === "string" && p.trim() !== "")
                    if (parts.length > 0) fullError = parts.join(" — ")
                } catch {
                    const errText = await res.text().catch(() => "")
                    if (errText) fullError = errText
                }
                setErrorMessage(fullError)
            }
        } catch (error: unknown) {
            console.error("Add playground error:", error)
            const errMessage = error instanceof Error ? error.message : "حدث خطأ أثناء الاتصال بالسيرفر"
            setErrorMessage(errMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    // ---- منطق التعديل ----
    const openEditModal = (playground: PlaygroundApiItem) => {
        setEditError("")
        setEditingPlayground(playground)
        setEditFormData({
            name: playground.name || "",
            description: playground.description || "",
            playgroundType: playgroundTypeNameToValue(playground.playgroundType),
            capacity: String(playground.capacity ?? ""),
            hourlyRate: String(playground.hourlyRate ?? ""),
            isActive: playground.isActive ?? true,
            imageFile: null,
            imagePreview: playground.photoUrl || ""
        })
    }

    const closeEditModal = () => {
        setEditingPlayground(null)
        setEditFormData(defaultFormData)
        setEditError("")
    }

    const handleEditImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setEditFormData(prev => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdatePlayground = async (e: FormEvent) => {
        e.preventDefault()
        if (!editingPlayground) return

        setEditError("")

        const token = localStorage.getItem("token")
        if (!token) {
            alert("❌ جلسة تسجيل الدخول انتهت، يرجى إعادة تسجيل الدخول.")
            router.replace('/')
            return
        }

        if (!editFormData.name.trim()) {
            setEditError("من فضلك أدخل اسم اللعبة.")
            return
        }

        if (!editFormData.capacity || Number(editFormData.capacity) <= 0) {
            setEditError("من فضلك أدخل سعة صحيحة للملعب.")
            return
        }

        if (!editFormData.hourlyRate || Number(editFormData.hourlyRate) < 0) {
            setEditError("من فضلك أدخل سعر ساعة صحيح.")
            return
        }

        setIsUpdating(true)

        try {
            const data = new FormData()
            data.append("Name", editFormData.name.trim())
            data.append("Description", editFormData.description.trim())
            data.append("PlaygroundType", String(editFormData.playgroundType))
            data.append("Capacity", String(parseInt(editFormData.capacity, 10)))
            data.append("HourlyRate", String(parseFloat(editFormData.hourlyRate)))
            data.append("IsActive", editFormData.isActive ? "true" : "false")

            if (editFormData.imageFile) {
                data.append("Photo", editFormData.imageFile)
            }

            const res = await fetch(`https://mahinproject.runasp.net/api/Playground/${editingPlayground.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })

            if (res.ok) {
                alert("تم تعديل اللعبة بنجاح! ✅")

                // تحديث الكارد في القائمة فورًا من غير ما نحتاج نعمل fetch تاني
                setPlaygrounds(prev => prev.map(p => {
                    if (p.id !== editingPlayground.id) return p
                    return {
                        ...p,
                        name: editFormData.name.trim(),
                        description: editFormData.description.trim(),
                        playgroundType: PlaygroundType[editFormData.playgroundType],
                        capacity: parseInt(editFormData.capacity, 10),
                        hourlyRate: parseFloat(editFormData.hourlyRate),
                        isActive: editFormData.isActive,
                        photoUrl: editFormData.imageFile ? editFormData.imagePreview : p.photoUrl
                    }
                }))

                closeEditModal()
                // نعمل ريفريش كامل للقائمة عشان نتأكد إن رابط الصورة الحقيقي من السيرفر ظهر صح
                fetchPlaygrounds()
            } else {
                let fullError = `فشل التعديل (${res.status})`
                try {
                    const errJson = await res.json()
                    const parts = [errJson?.message, errJson?.details, errJson?.title, errJson?.error]
                        .filter((p): p is string => typeof p === "string" && p.trim() !== "")
                    if (parts.length > 0) fullError = parts.join(" — ")
                } catch {
                    const errText = await res.text().catch(() => "")
                    if (errText) fullError = errText
                }
                setEditError(fullError)
            }
        } catch (error: unknown) {
            console.error("Update playground error:", error)
            const errMessage = error instanceof Error ? error.message : "حدث خطأ أثناء الاتصال بالسيرفر"
            setEditError(errMessage)
        } finally {
            setIsUpdating(false)
        }
    }

    if (isLoading || !isAuthorized) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-950 text-white"}`}>
                <p className="text-xl font-bold text-blue-600 animate-pulse">جاري التحقق من الصلاحيات...</p>
            </div>
        )
    }

    return (
        <main className={`w-full py-10 pt-28 px-5 md:px-20 min-h-screen transition-colors ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-white"}`}>

            <div className="max-w-6xl mx-auto">

                {/* 🔘 زرارين التنقل */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        type="button"
                        onClick={() => setView("add")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md ${
                            view === "add"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        }`}
                    >
                        <PlusCircleFill size={16} />
                        <span>إضافة لعبة جديدة</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setView("list")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md ${
                            view === "list"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        }`}
                    >
                        <ListIcon size={16} />
                        <span>عرض جميع الملاعب</span>
                    </button>
                </div>

                {/* ========== واجهة الإضافة ========== */}
                {view === "add" && (
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">إضافة لعبة جديدة</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">أدخل بيانات الملعب أو اللعبة الجديدة اللي هتضاف للنظام.</p>

                        {errorMessage && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-600 text-white shadow-lg flex items-start gap-3 border border-red-700">
                                <ExclamationTriangleFill className="text-2xl flex-shrink-0 mt-0.5" />
                                <p className="text-sm break-words whitespace-pre-wrap">{errorMessage}</p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className={`p-6 md:p-8 rounded-3xl border-2 border-blue-600 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
                        >
                            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-5 border-2 border-dashed border-blue-400 rounded-2xl">
                                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-600 mb-3 shadow-md bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={formData.imagePreview && formData.imagePreview.trim() !== "" ? formData.imagePreview : DEFAULT_IMAGE_PATH}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH }}
                                    />
                                </div>
                                <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
                                    <CloudUploadFill size={18} />
                                    <span>اختيار صورة اللعبة *</span>
                                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" required />
                                </label>
                                {!formData.imageFile && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">الصورة مطلوبة لإضافة اللعبة</p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <TagFill className="text-blue-600" size={14} />
                                    <span>اسم اللعبة</span>
                                </label>
                                <input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    placeholder="مثال: ملعب كرة القدم الرئيسي"
                                    required
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <CardText className="text-blue-600" size={14} />
                                    <span>الوصف</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={3}
                                    placeholder="وصف مختصر عن اللعبة أو الملعب..."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <Grid3x3GapFill className="text-blue-600" size={14} />
                                    <span>نوع اللعبة</span>
                                </label>
                                <select
                                    value={formData.playgroundType}
                                    onChange={(e) => setFormData({ ...formData, playgroundType: Number(e.target.value) as PlaygroundType })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                                >
                                    {playgroundTypeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <PeopleFill className="text-blue-600" size={14} />
                                    <span>سعة الملعب (عدد الأشخاص)</span>
                                </label>
                                <input
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value.replace(/[^0-9]/g, "") })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثال: 10"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <CashCoin className="text-blue-600" size={14} />
                                    <span>سعر الساعة (ج.م)</span>
                                </label>
                                <input
                                    value={formData.hourlyRate}
                                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value.replace(/[^0-9.]/g, "") })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="مثال: 100"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-blue-600 bg-gray-50 dark:bg-gray-800/50">
                                <div>
                                    <p className="text-sm font-semibold">حالة الإتاحة</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">هل اللعبة متاحة للحجز الآن؟</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                                        formData.isActive ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                                    }`}
                                >
                                    {formData.isActive ? <ToggleOn size={20} /> : <ToggleOff size={20} />}
                                    <span>{formData.isActive ? "متاحة" : "غير متاحة"}</span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="col-span-1 md:col-span-2 p-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:bg-gray-500 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircleFill size={18} />
                                <span>{isSubmitting ? "جاري إضافة اللعبة..." : "إضافة اللعبة"}</span>
                            </button>
                        </form>
                    </div>
                )}

                {/* ========== واجهة العرض ========== */}
                {view === "list" && (
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">جميع الملاعب</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">كل الملاعب والألعاب المسجلة في النظام.</p>

                        {listError && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-600 text-white shadow-lg flex items-center gap-3 border border-red-700">
                                <ExclamationTriangleFill className="text-2xl flex-shrink-0" />
                                <p className="text-sm">{listError}</p>
                            </div>
                        )}

                        {loadingList ? (
                            <p className="text-center py-16 font-bold text-blue-600 animate-pulse">جاري تحميل الملاعب...</p>
                        ) : playgrounds.length === 0 ? (
                            <p className="text-center py-16 text-gray-500">لا توجد ملاعب مسجلة حالياً.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {playgrounds.map((pg) => {
                                    const typeValue = playgroundTypeNameToValue(pg.playgroundType)
                                    return (
                                        <div
                                            key={pg.id}
                                            className={`rounded-3xl border-2 overflow-hidden shadow-xl transition-all ${
                                                pg.isActive ? "border-blue-600" : "border-red-600"
                                            } ${theme === "light" ? "bg-white" : "bg-gray-900 text-white"}`}
                                        >
                                            <div className="relative w-full h-44 bg-gray-100 dark:bg-gray-800">
                                                <img
                                                    src={pg.photoUrl && pg.photoUrl.trim() !== "" ? pg.photoUrl : DEFAULT_IMAGE_PATH}
                                                    alt={pg.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH }}
                                                />
                                                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                                    pg.isActive
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300"
                                                }`}>
                                                    {pg.isActive ? "● متاحة" : "● غير متاحة"}
                                                </span>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-lg font-bold mb-1">{pg.name}</h3>
                                                {pg.description && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{pg.description}</p>
                                                )}

                                                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                                        <Grid3x3GapFill className="text-blue-600 flex-shrink-0" />
                                                        <span>{playgroundTypeLabel(typeValue)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                                        <PeopleFill className="text-blue-600 flex-shrink-0" />
                                                        <span>{pg.capacity} شخص</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 col-span-2">
                                                        <CashCoin className="text-blue-600 flex-shrink-0" />
                                                        <span>{pg.hourlyRate} ج.م / ساعة</span>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(pg)}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all cursor-pointer shadow-md"
                                                >
                                                    <PenFill size={14} />
                                                    <span>تعديل</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ========== مودال التعديل ========== */}
            {editingPlayground && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-2xl p-6 rounded-3xl border-2 border-blue-600 shadow-2xl relative max-h-[90vh] overflow-y-auto ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
                        <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-blue-600">تعديل: {editingPlayground.name}</h3>
                            <button onClick={closeEditModal} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 transition-all cursor-pointer">
                                <XLg size={16} />
                            </button>
                        </div>

                        {editError && (
                            <div className="mb-5 p-4 rounded-2xl bg-red-600 text-white shadow-lg flex items-start gap-3 border border-red-700">
                                <ExclamationTriangleFill className="text-2xl flex-shrink-0 mt-0.5" />
                                <p className="text-sm break-words whitespace-pre-wrap">{editError}</p>
                            </div>
                        )}

                        <form onSubmit={handleUpdatePlayground} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-400 rounded-2xl mb-2">
                                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-600 mb-3 shadow-md bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={editFormData.imagePreview && editFormData.imagePreview.trim() !== "" ? editFormData.imagePreview : DEFAULT_IMAGE_PATH}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE_PATH }}
                                    />
                                </div>
                                <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
                                    <CloudUploadFill size={18} />
                                    <span>تغيير الصورة</span>
                                    <input type="file" accept="image/*" onChange={handleEditImageFileChange} className="hidden" />
                                </label>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold mb-1 block">اسم اللعبة</label>
                                <input
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold mb-1 block">الوصف</label>
                                <textarea
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">نوع اللعبة</label>
                                <select
                                    value={editFormData.playgroundType}
                                    onChange={(e) => setEditFormData({ ...editFormData, playgroundType: Number(e.target.value) as PlaygroundType })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                                >
                                    {playgroundTypeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">السعة</label>
                                <input
                                    value={editFormData.capacity}
                                    onChange={(e) => setEditFormData({ ...editFormData, capacity: e.target.value.replace(/[^0-9]/g, "") })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">سعر الساعة (ج.م)</label>
                                <input
                                    value={editFormData.hourlyRate}
                                    onChange={(e) => setEditFormData({ ...editFormData, hourlyRate: e.target.value.replace(/[^0-9.]/g, "") })}
                                    className="w-full p-3 rounded-2xl border border-blue-600 outline-none text-black dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    inputMode="decimal"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-blue-600 bg-gray-50 dark:bg-gray-800/50">
                                <div>
                                    <p className="text-sm font-semibold">حالة الإتاحة</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditFormData({ ...editFormData, isActive: !editFormData.isActive })}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                                        editFormData.isActive ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                                    }`}
                                >
                                    {editFormData.isActive ? <ToggleOn size={20} /> : <ToggleOff size={20} />}
                                    <span>{editFormData.isActive ? "متاحة" : "غير متاحة"}</span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="col-span-1 md:col-span-2 p-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:bg-gray-500 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircleFill size={18} />
                                <span>{isUpdating ? "جاري حفظ التعديلات..." : "حفظ التعديلات"}</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}
