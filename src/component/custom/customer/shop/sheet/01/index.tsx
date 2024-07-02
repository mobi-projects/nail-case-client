export default function ReservationResponseReceptionSheet() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-around">
			<TopRightArrowIcon />
			<ResponseMessage />
			<ReservationContent />
		</div>
	)
}

export function TopRightArrowIcon() {
	return (
		<div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-Gray90">
			<p className="flex h-[31.5px] w-[31.5px] scale-[200%] items-center justify-center bg-gradient-to-t from-PY100 to-PB100 bg-clip-text text-center font-Bold text-transparent">
				NT
			</p>
		</div>
	)
}
function ResponseMessage() {
	return (
		<div className="flex h-fit w-full flex-col items-center gap-[1px]">
			<p className="text-center text-Title01 font-Bold">
				예약이 요청되었습니다.
			</p>
			<p className="text-center text-Callout font-Light">
				예약확정에 시간이 소요될 수 있습니다.
			</p>
		</div>
	)
}

function ReservationContent() {
	return (
		<div className="grid h-[351px] w-[838px] grid-rows-[1fr_auto_2fr] items-center rounded-[26px] bg-Gray90 p-[19px]">
			<ContentHeader />
			<hr className="h-[1.5px] w-full border-Gray70" />
			<ContentBody />
		</div>
	)
}
function ContentHeader() {
	return (
		<div className="flex h-[85px] flex-col justify-between">
			<p className="text-center text-Body01 font-SemiBold text-White">
				모네네일 한남점
			</p>
			<p className="text-center text-Body02 font-Regular text-PB100">
				6월 27일 (목요일) 오후 1:00 - 2:00
			</p>
			<p className="text-center text-Body02 font-Regular text-White">
				2인 동반 시술
			</p>
		</div>
	)
}

// const TREATMENT_MAP: { [key in TNailTreatment]: string } = {
// 	AOM: "이달의 아트",
// 	CARE: "케어",
// 	ONE: "원 컬러",
// 	MEMBER_IMAGE: "사진등록",
// }
// const REMOVE_MAP: { [key in TRemoveOption]: string } = {
// 	"IN-SHOP": "자샵 제거 필요",
// 	"ELSE-WHERE": "타샵 제거 필요",
// 	"NO-NEED": "제거 필요 없음",
// }

function ContentBody() {
	return (
		<div className="flex h-full w-full flex-col justify-center gap-[15px]">
			<DetailInfo />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo />
		</div>
	)
}

function DetailInfo() {
	return (
		<div className="grid h-fit w-full grid-cols-[auto_2px_1fr] items-center justify-start">
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-White">
				시술 내용
			</div>
			<div className="h-[13px] w-full bg-Gray70" />
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-PB100">
				케어, 사진 등록
			</div>
		</div>
	)
}
