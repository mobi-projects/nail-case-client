import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"
import {
	getDateFromStamp,
	getDayOfWeekFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
	padStartToPrinting,
} from "@/util/common"

type ReservationResponseReceptionSheetPT = {
	shopId: number
	startTime: number
	endTime: number
	treatmentArr: TNailTreatment[]
	remove: TRemoveOption
	extend: boolean
}

export default function ReservationResponseReceptionSheet({
	shopId,
	startTime,
	endTime,
	treatmentArr,
	remove,
	extend,
}: ReservationResponseReceptionSheetPT) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-around">
			<TopRightArrowIcon />
			<ResponseMessage />
			<ReservationContent
				{...{ shopId, startTime, endTime, remove, treatmentArr, extend }}
			/>
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

function ReservationContent({
	shopId,
	startTime,
	endTime,
	remove,
	treatmentArr,
	extend,
}: ReservationResponseReceptionSheetPT) {
	return (
		<div className="grid h-[351px] w-[838px] grid-rows-[1fr_auto_2fr] items-center rounded-[26px] bg-Gray90 p-[19px]">
			<ContentHeader {...{ shopId, startTime, endTime }} />
			<hr className="h-[1.5px] w-full border-Gray70" />
			<ContentBody {...{ treatmentArr, remove, extend }} />
		</div>
	)
}
function ContentHeader({
	// shopId, // [Todo] 추후에 수정, 샵 이름이 필요하다.
	startTime,
	endTime,
}: Pick<
	ReservationResponseReceptionSheetPT,
	"shopId" | "startTime" | "endTime"
>) {
	const printedMonth = `${getMonthFromStamp(startTime)}월`
	const printedDate = `${getDateFromStamp(startTime)}일`
	const printedDayOfWeek = `(${getDayOfWeekFromStamp(startTime)}요일)`

	const startHour = getDateFromStamp(startTime)
	const startMin = getMinFromStamp(startTime)
	const printedStartDivision = startHour >= 12 ? "오후" : "오전"
	const printedStartTime = `${startHour}:${padStartToPrinting("time", startMin)}`

	const endHour = getDateFromStamp(endTime)
	const endMin = getMinFromStamp(endTime)
	const printedEndDivision = endHour >= 12 ? "오후" : "오전"
	const printedEndTime = `${startHour}:${padStartToPrinting("time", endMin)}`

	const printedReservationTime = [
		printedMonth,
		printedDate,
		printedDayOfWeek,
		printedStartDivision,
		printedStartTime,
		"-",
		printedEndDivision,
		printedEndTime,
	].join(" ")

	return (
		<div className="flex h-[85px] flex-col justify-between">
			<p className="text-center text-Body01 font-SemiBold text-White">
				모네네일 한남점
			</p>
			<p className="text-center text-Body02 font-Regular text-PB100">
				{printedReservationTime}
			</p>
			<p className="text-center text-Body02 font-Regular text-White">
				1인 시술
			</p>
		</div>
	)
}

const TREATMENT_MAP: { [key in TNailTreatment]: string } = {
	AOM: "이달의 아트",
	CARE: "케어",
	ONE: "원 컬러",
	MEMBER_IMAGE: "사진등록",
}
const REMOVE_MAP: { [key in TRemoveOption]: string } = {
	IN_SHOP: "자샵 제거 필요",
	ELSE_WHERE: "타샵 제거 필요",
	NO_NEED: "제거 필요 없음",
}

function ContentBody({
	treatmentArr,
	remove,
	extend,
}: Pick<
	ReservationResponseReceptionSheetPT,
	"treatmentArr" | "remove" | "extend"
>) {
	const treatmentInfo = treatmentArr
		.map((treatment) => TREATMENT_MAP[treatment])
		.join(", ")
	const removeInfo = REMOVE_MAP[remove]
	const extendInfo = extend ? "연장 필요" : "연장 필요 없음"
	return (
		<div className="flex h-full w-full flex-col justify-center gap-[15px]">
			<DetailInfo title="시술 내용" info={treatmentInfo} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="네일 제거 유무" info={removeInfo} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="연장 유무" info={extendInfo} />
		</div>
	)
}

type DetailInfo = {
	title: string
	info: string
}

function DetailInfo({ title, info }: DetailInfo) {
	return (
		<div className="grid h-fit w-full grid-cols-[auto_2px_1fr] items-center justify-start">
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-White">
				{title}
			</div>
			<div className="h-[13px] w-full bg-Gray70" />
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-PB100">
				{info}
			</div>
		</div>
	)
}
