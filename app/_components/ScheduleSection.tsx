type ScheduleItem = {
  time: string
  title: string
  note?: string
}

type ScheduleDay = {
  day: string
  date: string
  items: ScheduleItem[]
}

const days: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "วันศุกร์ 16 Oct",
    items: [
      { time: "12:30", title: "ถึงที่พัก + กินข้าวกลางวันที่ Lake Heaven Resort" },
      { time: "14:00", title: "Check in ห้องพักที่ Lake Heaven Resort" },
      { time: "14:30", title: "พักผ่อน - เล่นสวนน้ำ" },
      { time: "18:00", title: "กินข้าวเย็นในห้องจัดเลี้ยง" },
      {
        time: "19:00",
        title: "ร้องเพลงคาราโอเกะ + สังสรรค์ในห้องจัดเลี้ยง",
        note: "ห้องจัดเลี้ยงได้ถึง 23:00 หลังจากนี้มานั่งกินกันต่อด้านนอก",
      },
    ],
  },
  {
    day: "Day 2",
    date: "วันเสาร์ 17 Oct",
    items: [
      { time: "07:00 – 09:30", title: "กินข้าวเช้าที่พัก" },
      { time: "10:00", title: "อาบน้ำ + เก็บของ" },
      { time: "10:45", title: "ถ่ายรูปร่วมกัน" },
      { time: "11:00", title: "Check out" },
      { time: "12:30", title: "กินข้าวเที่ยงพร้อมกันที่ร้านอาหาร คีรีมันตรา กาญจนบุรี" },
      { time: "14:00", title: "แยกย้ายเดินทางกลับ" },
    ],
  },
]

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-28 bg-white section-divider">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex w-fit mx-auto lg:mx-0 items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              Schedule
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none text-center lg:text-left">
            Trip Schedule
          </h2>
        </div>

        {/* Days */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {days.map((day) => (
            <div
              key={day.day}
              className="bg-white rounded-2xl border border-secondary/8 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 bg-secondary flex items-center justify-between">
                <span className="text-primary text-sm font-bold tracking-widest uppercase">
                  {day.day}
                </span>
                <span className="text-white font-semibold">{day.date}</span>
              </div>

              <ol className="px-6 py-6">
                {day.items.map((item, i) => (
                  <li key={item.time} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {i < day.items.length - 1 && (
                      <span className="absolute left-[5px] top-4 bottom-0 w-px bg-secondary/10" />
                    )}
                    <span className="relative mt-1.5 w-[11px] h-[11px] rounded-full bg-primary border-2 border-secondary flex-shrink-0" />
                    <div className="flex flex-col sm:flex-row sm:gap-4 min-w-0">
                      <span className="text-secondary font-bold text-sm tabular-nums sm:w-28 flex-shrink-0">
                        {item.time}
                      </span>
                      <div className="min-w-0">
                        <p className="text-dark-text/80 leading-relaxed">{item.title}</p>
                        {item.note && (
                          <p className="text-dark-text/50 text-sm leading-relaxed mt-1">{item.note}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
