
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section className="relative grid grid-cols-1 items-center gap-10 overflow-hidden px-5 py-10 text-white md:px-20 lg:grid-cols-2">
      {/* ================= IMAGES ================= */}
      <div className="relative">
        {/* Main Image */}
        <div className="group relative h-full overflow-hidden rounded-3xl">
          <Image
            src="/images/club-main.jpeg"
            alt="Club Members"
            width={300}
            height={300}
            className="h-[480px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* Small Image */}
        <div className="absolute -bottom-6 -right-6 hidden w-48 overflow-hidden rounded-3xl border-8 border-slate-950 shadow-2xl md:block">
          <Image
            src="/images/club-small.jpeg"
            alt="Club Activity"
            width={300}
            height={300}
            className="h-52 w-full object-cover transition duration-500 hover:scale-110"
          />
        </div>
      </div>

      {/* ================= TEXT ================= */}
      <div>
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xl font-semibold uppercase tracking-wider text-blue-400">
            قصتنا
          </span>
        </div>


        {/* Description */}
        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
          فَشُكْرًا للهِ عَلَى عَطِيَّتِهِ الَّتِي لَا يُعَبَّرُ عَنْهَا. (كورنثوس ١٥:٩) 
        </p>

        <p className="mt-4 max-w-xl leading-7 text-gray-500">
          كل المجد و الشكر ليك يارب علي عطيتك لينا بصلوات و شفاعات الست العدرا مريم 
          و الشهيد العظيم مارجرجس و بصلوات ودعم نيافة الحبر الجليل الانبا ايلاريون اسقف البحيرة و توابعها و 
          الاباء الكهنة الموقرين اباء كنيسة الشهيد العظيم مارجرجس كفر الدوار و دعم
          وتكاتف شباب الكنيسة اصبح الحلم حقيقة بين ايدينا فشكرا لك يارب علي عطيتك
        </p>

        {/* ================= STATS ================= */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
          {/* Stat 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.07] sm:p-5">
            <h3 className="text-2xl font-black text-white sm:text-3xl">500+</h3>
            <p className="mt-1 text-xs text-gray-500 sm:text-xl">اعضاء</p>
          </div>

          {/* Stat 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.07] sm:p-5">
            <h3 className="text-2xl font-black text-white sm:text-3xl">50+</h3>
            <p className="mt-1 text-xs text-gray-500 sm:text-xl">دورات</p>
          </div>

          {/* Stat 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.07] sm:p-5">
            <h3 className="text-2xl font-black text-white sm:text-3xl">15+</h3>
            <p className="mt-1 text-xs text-gray-500 sm:text-xl">جوائز</p>
          </div>
        </div>
      </div>
    </section>
  );
};

    
export default About;

