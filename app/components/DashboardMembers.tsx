// // 






// "use client"
// import Image from 'next/image'
// import Link from 'next/link'
// import { memberType } from '../assets/assets'
// import { useThemeContext } from '../assets/contexts'
// import defaultImg from "../../public/images/st-george-killing-dragon.png" // الصورة الافتراضية

// export default function DasboardMember() {
//     const { theme } = useThemeContext()

//     return (
//         <div className={`flex items-center justify-between p-3 my-2 rounded-2xl border transition-all ${
//             theme === "light" 
//                 ? "bg-white border-gray-300 text-black shadow-sm" 
//                 : "bg-gray-700 border-gray-600 text-white"
//         }`}>
//             {/* الجزء الأيسر: الصورة والاسم ورقم الهاتف */}
//             <div className="flex items-center gap-3">
//                 {/* 📸 صورة البروفايل */}
//                 <Image
//                     src={member.image && member.image.trim() !== "" ? member.image : defaultImg}
//                     alt={member.fullName || "Member Profile"}
//                     width={50}
//                     height={50}
//                     unoptimized // يسمح بتحميل الصور الخارجية من سيرفر الـ API
//                     className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
//                 />

//                 <div>
//                     <h4 className="font-bold text-base md:text-lg capitalize">
//                         {member.fullName || "Unknown User"}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-500">
//                         {member.fullNumber || "No Phone Number"}
//                     </p>
//                 </div>
//             </div>

//             {/* الجزء الأيمن: الحالة وزر التفاصيل */}
//             <div className="flex items-center gap-3">
//                 {/* شارة حالة الحساب */}
//                 <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
//                     member.isActive 
//                         ? "bg-green-100 text-green-700" 
//                         : "bg-red-100 text-red-700"
//                 }`}>
//                     {member.isActive ? "Active" : "Inactive"}
//                 </span>

//                 {/* زر الانتقال لصفحة البروفايل */}
//                 <Link
//                     href={`/profile/${member.id}`} 
//                     className="px-3 py-1.5 bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm rounded-xl transition-colors font-medium"
//                 >
//                     View
//                 </Link>
//             </div>
//         </div>
//     )
// }
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { memberType } from '../assets/assets'
import { useThemeContext } from '../assets/contexts'
import defaultImg from "../../public/images/st-george-killing-dragon.png" // الصورة الافتراضية

// 1️⃣ تحديد نوع الـ Props وجعله اختياريًا لتفادي أخطاء TypeScript
interface DasboardMemberProps {
    member?: memberType;
}

// 2️⃣ استلام { member } داخل أقواس الدالة
export default function DasboardMember({ member }: DasboardMemberProps) {
    const { theme } = useThemeContext()

    // التأكد من وجود رابط الصورة بشكل آمن
    const userImage = member?.image && member.image.trim() !== "" ? member.image : defaultImg

    return (
        <div className={`flex items-center justify-between p-3 my-2 rounded-2xl border transition-all ${
            theme === "light" 
                ? "bg-white border-gray-300 text-black shadow-sm" 
                : "bg-gray-700 border-gray-600 text-white"
        }`}>
            {/* الجزء الأيسر: الصورة والاسم ورقم الهاتف */}
            <div className="flex items-center gap-3">
                {/* 📸 صورة البروفايل */}
                <Image
                    src={userImage}
                    alt={member?.fullName || "Member Profile"}
                    width={50}
                    height={50}
                    unoptimized // يسمح بتحميل الصور الخارجية من سيرفر الـ API
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                />

                <div>
                    <h4 className="font-bold text-base md:text-lg capitalize">
                        {member?.fullName || "Unknown User"}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                        {member?.fullNumber || "No Phone Number"}
                    </p>
                </div>
            </div>

            {/* الجزء الأيمن: الحالة وزر التفاصيل */}
            <div className="flex items-center gap-3">
                {/* شارة حالة الحساب */}
                <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
                    member?.isActive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                }`}>
                    {member?.isActive ? "Active" : "Inactive"}
                </span>

                {/* زر الانتقال لصفحة البروفايل */}
                <Link
                    href={`/profile/${member?.id || ''}`} 
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm rounded-xl transition-colors font-medium"
                >
                    View
                </Link>
            </div>
        </div>
    )
}