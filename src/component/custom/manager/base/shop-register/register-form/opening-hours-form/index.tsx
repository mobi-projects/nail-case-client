import EachDayOfWeek from "./each-day-of-week"

export default function OpeningHoursForm() {
	return (
		<div className="flex flex-col gap-[40px]">
			<EachDayOfWeek dayOfWeek="월" />
			<EachDayOfWeek dayOfWeek="화" />
			<EachDayOfWeek dayOfWeek="수" />
			<EachDayOfWeek dayOfWeek="목" />
			<EachDayOfWeek dayOfWeek="금" />
			<EachDayOfWeek dayOfWeek="토" />
			<EachDayOfWeek dayOfWeek="일" />
		</div>
	)
}
