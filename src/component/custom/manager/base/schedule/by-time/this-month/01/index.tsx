// "use client"
// import dayjs from "dayjs"
// import { useState } from "react"

// import { NTEvent } from "@/component/common/nt-event"
// import { cn } from "@/config/tailwind"

// export default function MonthlySchedule() {
// 	const days = ["일", "월", "화", "수", "목", "금", "토"]
// 	const currentDate = dayjs()
// 	const [today] = useState(currentDate)

// 	return (
// 		<div className="h-fit w-full rounded-[28px] bg-White drop-shadow-[2.99px_2.99px_14.34px_rgba(224,224,224,0.6)]">
// 			<div className="grid h-[106px] w-full grid-cols-7 divide-x-[0.3px]">
// 				{days.map((day, idx) => {
// 					return (
// 						<div
// 							key={idx}
// 							className="place-content-centerpt-10 grid h-full border-x-Gray20 pt-14 text-center text-Headline02"
// 						>
// 							{day}
// 						</div>
// 					)
// 				})}
// 			</div>
// 			<div className="grid h-[1094px] w-full grid-cols-7">
// 				{generateDate(today.month(), today.year()).map(
// 					({ date, currentMonth, isToday }, idx) => {
// 						return (
// 							<div
// 								key={idx}
// 								className={cn(
// 									"flex flex-col gap-2 border-x-[0.3px] border-e-0 px-2",
// 									isToday
// 										? "border-t-[3px] border-t-PB50"
// 										: "border-t-[2px] border-t-Gray10",
// 									idx % 7 === 0 && "border-l-0",
// 								)}
// 							>
// 								<p
// 									className={cn(
// 										isToday
// 											? "text-[16px] font-Bold text-PB100"
// 											: "text-Callout font-SemiBold text-Gray80",
// 										!currentMonth && "text-Callout font-SemiBold text-Gray40",
// 										"flex h-[40px] items-center",
// 									)}
// 								>
// 									{currentMonth && date.date() === 1
// 										? `${today.month() + 1}월 ${date.date()}일`
// 										: `${date.date()}일`}
// 								</p>

// 								<NTEvent variant={"quinary"}>시술 6건</NTEvent>
// 								<NTEvent variant={"septenary"}>시술 6건</NTEvent>
// 							</div>
// 						)
// 					},
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
// 	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month")
// 	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")

// 	const arrayOfDate = []

// 	// create prefix date
// 	for (let i = 0; i < firstDateOfMonth.day(); i++) {
// 		const date = firstDateOfMonth.subtract(firstDateOfMonth.day() - i, "day")

// 		arrayOfDate.push({
// 			currentMonth: false,
// 			date,
// 			isToday: false,
// 		})
// 	}

// 	// generate current date
// 	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
// 		arrayOfDate.push({
// 			currentMonth: true,
// 			date: firstDateOfMonth.date(i),

// 			isToday:
// 				firstDateOfMonth.date(i).toDate().toDateString() ===
// 				dayjs().toDate().toDateString(),
// 		})
// 	}

// 	const remaining = 42 - arrayOfDate.length

// 	for (
// 		let i = lastDateOfMonth.date() + 1;
// 		i <= lastDateOfMonth.date() + remaining;
// 		i++
// 	) {
// 		arrayOfDate.push({
// 			currentMonth: false,
// 			date: lastDateOfMonth.add(i - lastDateOfMonth.date(), "day"),
// 			isToday: false,
// 		})
// 	}
// 	return arrayOfDate
// }
export default function MonthlySchedule() {
	return <h1>MonthlySchedule</h1>
}
