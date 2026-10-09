import Image from "next/image"

const floatingDrinks = [
  { emoji: "🍺", className: "top-[10%] left-[6%] text-5xl", delay: "0s" },
  { emoji: "🍻", className: "top-[18%] right-[8%] text-6xl", delay: "0.8s" },
  { emoji: "🥃", className: "bottom-[22%] left-[10%] text-4xl", delay: "1.6s" },
  { emoji: "🍷", className: "bottom-[12%] right-[12%] text-5xl", delay: "2.4s" },
  { emoji: "🧊", className: "top-[48%] left-[3%] text-3xl", delay: "1.2s" },
  { emoji: "🍹", className: "top-[55%] right-[4%] text-4xl", delay: "2s" },
]

const menu = [
  { emoji: "🍺", item: "เบียร์เย็นๆ ริมทะเลสาบ", effect: "ความสุข +10" },
  { emoji: "🥃", item: "ช็อตแรกของคืน", effect: "ความกล้า +50" },
  { emoji: "🎤", item: "ช็อตที่สาม", effect: "ปลดล็อกโหมดคาราโอเกะ" },
  { emoji: "🫶", item: "ช็อตที่ห้า", effect: "รักทุกคนในทีม" },
  { emoji: "😴", item: "เช้าวันถัดมา", effect: "HP -99 (ไม่รับเคลม)" },
]

export default function DrinksSection() {
  return (
    <section id="drinks" className="relative py-28 bg-secondary overflow-hidden section-divider">
  

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex w-fit mx-auto items-center gap-2 bg-primary rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-secondary text-xs font-semibold tracking-widest uppercase">Bar Tab</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6">
            <span className="cheers-left">🍺</span> Cheers Fund <span className="cheers-right">🍺</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            ค่าเหล้า ค่าเบียร์ ค่ามิตรภาพ — สแกนโอนมาได้เลย ไม่ต้องเกรงใจ
            <br />
            เงินทุกบาทจะถูกแปลงเป็นความสุขอย่างโปร่งใส (มั้ง) 🫣
          </p>
          <div className="mt-8 inline-flex flex-col items-center -rotate-2 bg-primary text-secondary rounded-3xl px-8 py-5 shadow-xl shadow-black/30">
            <span className="text-xs font-semibold tracking-widest uppercase">ขั้นต่ำต่อคน</span>
            <span className="text-5xl sm:text-6xl font-black tracking-tight leading-none my-1">500฿</span>
            <span className="text-sm font-semibold">โอนเกินได้ ไม่ว่ากัน 🤭</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* QR card */}
          <div className="relative mx-auto w-full max-w-sm">
       
            <div className="qr-card bg-white rounded-3xl p-3 shadow-2xl shadow-black/40">
              <Image
                src="/images/promptpay-qr.jpg"
                alt="PromptPay QR code for the drinks fund"
                width={1320}
                height={1601}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 640px) 90vw, 384px"
              />
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="/images/promptpay-qr.jpg"
                download="cheers-fund-qr.jpg"
                className="inline-flex items-center gap-2 bg-primary text-secondary font-bold text-sm px-6 py-3 rounded-xl hover:brightness-95 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                เซฟ QR ไว้โอนทีหลัง
              </a>
            </div>
          </div>

          {/* Funny "menu" */}
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">Today&apos;s Menu</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">คุณจะได้อะไรจากการโอน?</h3>
            <ul className="divide-y divide-white/10">
              {menu.map(({ emoji, item, effect }) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <span className="text-3xl flex-shrink-0">{emoji}</span>
                  <span className="text-white/80 flex-1">{item}</span>
                  <span className="text-primary text-sm font-semibold text-right">{effect}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-sm text-white/60 leading-relaxed">
              🚗🙅 <span className="text-white font-semibold">ดื่มแล้วไม่ขับ</span> — ส่งกุญแจรถให้เพื่อนที่ยังสติดีอยู่
              <br />
              💧 สลับกับน้ำเปล่าด้วยนะ พรุ่งนี้ยังมีกิจกรรมต่อ
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
