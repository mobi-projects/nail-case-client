export default function ClosedDay() {
	return (
		<div className="flex h-[400px] w-full flex-col items-center justify-center gap-y-4 lg:h-[250px] max-md:h-[150px]">
			<p className="text-Title01 font-SemiBold text-Gray60 lg:text-[20px] max-md:text-[16px]">
				죄송합니다, 선택하신 날짜는 휴무일입니다.
			</p>
			<p className="text-Title03 font-Regular text-Gray30 lg:text-[16px] max-md:text-[12px]">
				현재 날짜에는 예약을 받을 수 없습니다. 다른 날짜를 선택해 주세요.
			</p>
		</div>
	)
}
