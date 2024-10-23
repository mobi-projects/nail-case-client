export default function ReservationSummaryError() {
	return (
		<div className="my-10 grid h-[288px] w-2/3 grid-rows-[auto_1fr] rounded-3xl bg-White px-8 py-4 shadow-customGray80 md:h-[14.5rem] max-lg:w-full">
			<div className="py-3 text-Title03 font-SemiBold text-PB100 lg:text-[18px] max-md:text-[16px]">
				진행 중인 네일
			</div>
			<div className="flex w-full items-center justify-center">
				<p className="text-Title01 text-Gray60 lg:text-[20px] max-md:text-[18px]">
					죄송합니다. 인터넷문제로 예약정보를 불러오지 못했습니다.
				</p>
			</div>
		</div>
	)
}
