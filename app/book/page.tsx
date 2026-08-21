"use client";

import React, { useState, useEffect } from "react";
// import { CalendarCheck, ShieldAlert, CheckCircle, Clock, SportsSoccer } from "lucide-react";

// تعريف أنواع البيانات
export interface BookingRequest {
  id: string;
  userName: string;
  userPhone: string;
  sport: "football" | "volleyball" | "pingpong";
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:00
  price: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// أسعار الملاعب بالساعة (يمكنك تعديلها)
const SPORT_PRICES = {
  football: 200,   // ملعب كورة
  volleyball: 150, // ملعب طايرة
  pingpong: 80     // طاولة بنج
};

const SPORT_NAMES = {
  football: "ملعب كرة القدم",
  volleyball: "ملعب الكرة الطائرة",
  pingpong: "طاولة البنج بونج"
};

// الأوقات المتاحة للحجز (من 10 صباحاً حتى 11 مساءً)
const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", 
  "20:00", "21:00", "22:00", "23:00"
];

export default function BookingPage() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [sport, setSport] = useState<"football" | "volleyball" | "pingpong">("football");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  
  const [existingBookings, setExistingBookings] = useState<BookingRequest[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // جلب الحجوزات المعتمدة والمعلقة لتفادي التعارض
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("court_bookings") || "[]");
    setExistingBookings(savedBookings);
  }, []);

  // حساب التكلفة فورياً
  const calculatedPrice = SPORT_PRICES[sport];

  // التحقق مما إذا كان الموعد محجوزاً ومقبولاً
  const isSlotBooked = (slot: string) => {
    return existingBookings.some(
      (b) => b.sport === sport && b.date === date && b.timeSlot === slot && b.status === "approved"
    );
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!userName || !userPhone || !date || !timeSlot) {
      setMessage({ type: "error", text: "يرجى ملء جميع الحقول المطلوب." });
      return;
    }

    // التأكد من عدم حجز الموعد من قبل شخص آخر
    if (isSlotBooked(timeSlot)) {
      setMessage({ type: "error", text: "⚠️ هذا الموعد محجوز بالفعل! يرجى اختيار وقت آخر." });
      return;
    }

    const newBooking: BookingRequest = {
      id: Date.now().toString(),
      userName,
      userPhone,
      sport,
      date,
      timeSlot,
      price: calculatedPrice,
      status: "pending",
      createdAt: new Date().toLocaleString("ar-EG")
    };

    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("court_bookings", JSON.stringify(updatedBookings));
    setExistingBookings(updatedBookings);

    setMessage({ 
      type: "success", 
      text: `🎉 تم إرسال طلب الحجز بنجاح! قيمة الحجز: ${calculatedPrice} ج.م (في انتظار موافقة الأدمن).` 
    });

    // إعادة ضبط النموذج
    setUserName("");
    setUserPhone("");
    setTimeSlot("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10 flex justify-center items-center font-sans dir-rtl" dir="rtl">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <CalendarCheck className="text-emerald-500 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">حجز الملاعب والصالات</h1>
            <p className="text-xs text-slate-400">اختر الملعب والموعد المناسب وسجل بياناتك</p>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-2xl mb-6 text-sm flex items-center gap-2 ${
            message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}>
            {message.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <ShieldAlert className="w-5 h-5 flex-shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">اسم الحاكز بالكامل</label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك"
              className="w-full p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">رقم الهاتف</label>
            <input
              type="tel"
              required
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">نوع الملعب / اللعبة</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value as any)}
              className="w-full p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
            >
              <option value="football">ملعب كرة القدم (200 ج.م / ساعة)</option>
              <option value="volleyball">ملعب الكرة الطائرة (150 ج.م / ساعة)</option>
              <option value="pingpong">طاولة البنج بونج (80 ج.م / ساعة)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">تاريخ الحجز</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {date && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">اختر الموعد المتاح</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                {TIME_SLOTS.map((slot) => {
                  const booked = isSlotBooked(slot);
                  const isSelected = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={booked}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-3 text-xs rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-1 ${
                        booked
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-500 line-through cursor-not-allowed opacity-60"
                          : isSelected
                          ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-95"
                          : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                      }`}
                    >
                      <span>{slot}</span>
                      <span className="text-[10px] font-normal">{booked ? "محجوز" : "متاح"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* قيمة الاشتراك الكلية */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">تكلفة الحجز الإجمالية:</span>
            <span className="text-xl font-extrabold text-emerald-400">{calculatedPrice} <span className="text-xs font-normal text-slate-300">ج.م</span></span>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 text-sm cursor-pointer"
          >
            تأكيد إرسال الطلب
          </button>
        </form>
      </div>
    </div>
  );
}