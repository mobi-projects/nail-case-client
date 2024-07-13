import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { cn } from "@/config/tailwind"
import {
	get12HourFromStamp,
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
	getNowStamp,
	padStartToPrinting,
} from "@/util/common"

export default function ReservationResponseSheet() {
	const isError = true
	const isPending = false

	if (isPending)
		return (
			<div className="flex h-full w-full flex-col items-center justify-center gap-10">
				<NTLoadingSpinner size="medium" />
				<p className="text-Body01">잠시만 기다려주세요.</p>
			</div>
		)

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-6">
			<SheetIcon {...{ isError }} />
			<ResponseMessage {...{ isError }} />
			{isError ? <BackToHistoryButtonGroup /> : <ReservationContent />}
		</div>
	)
}

const SheetIcon = ({ isError = false }: { isError?: boolean }) => {
	return (
		<div
			className={cn(
				"flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full",
				isError ? "bg-PB90" : "bg-gradient-to-t from-PB100 to-PY100 p-0",
			)}
		>
			{isError ? (
				<p className="text-center text-Headline01 text-White">!</p>
			) : (
				<NTIcon
					icon="circleUpRight"
					className="h-[100px] w-[100px] bg-transparent text-Gray90"
				/>
			)}
		</div>
	)
}
const ResponseMessage = ({ isError = false }: { isError?: boolean }) => {
	return (
		<div className="flex h-fit w-full flex-col items-center gap-[1px]">
			{isError ? (
				<>
					<p className="text-center text-Title01 font-Bold">
						예약 요청 중, 오류가 발생했습니다.
					</p>
					<p className="text-center text-Callout font-Light">
						예약 내용을 다시 확인해주세요.
					</p>
				</>
			) : (
				<>
					<p className="text-center text-Title01 font-Bold">
						예약이 요청되었습니다.
					</p>
					<p className="text-center text-Callout font-Light">
						예약확정에 시간이 소요될 수 있습니다.
					</p>
				</>
			)}
		</div>
	)
}

function ReservationContent() {
	return (
		<div className="grid h-3/5 w-3/5 grid-rows-[1fr_auto_2fr] items-center rounded-[26px] bg-Gray90 p-[19px]">
			<ContentHeader />
			<hr className="h-[1.5px] w-full border-Gray70" />
			<ContentBody />
		</div>
	)
}
function ContentHeader() {
	const startTime = getNowStamp()

	const printedReservationTime = [
		`${getMonthFromStamp(startTime)}월`,
		`${getDateFromStamp(startTime)}일`,
		`(${getDayOfWeekFromStamp(startTime)}요일)`,
		`${getDayDivisionInKor(startTime)}`,
		`${get12HourFromStamp(startTime)}:${padStartToPrinting("time", getMinFromStamp(startTime))}`,
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

function ContentBody() {
	return (
		<div className="flex h-full w-full flex-col justify-center gap-[15px]">
			<DetailInfo title="시술 내용" info={"손톱 보수 필요"} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="네일 제거 유무" info={"이달의 아트"} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="연장 유무" info={"연장 필요"} />
		</div>
	)
}
type DetailInfoPT = {
	title: string
	info: string
}
function DetailInfo({ title, info }: DetailInfoPT) {
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
function BackToHistoryButtonGroup() {
	return (
		<div className="flex h-fit w-3/5 items-center justify-center gap-2 rounded-[26px] p-[19px]">
			<NTButton variant="secondary" size="small" flexible="full" icon="back">
				다시 예약하기
			</NTButton>
			<NTButton size="small" flexible="full" icon="homeLight">
				HOME 으로 돌아가기
			</NTButton>
		</div>
	)
}
