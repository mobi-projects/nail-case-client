import NTNameBox from "@/component/common/nt-name-box"

export default function ReservationTableHeader() {
	return (
		<div className="grid w-full grid-cols-[1fr_2fr_2fr_2fr] py-3">
			<div className="flex items-center justify-center">
				<NTNameBox bgColor={"BGblue"}>요청</NTNameBox>
			</div>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">이름</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">
				날짜(요일)
			</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">시간</p>
		</div>
	)
}
