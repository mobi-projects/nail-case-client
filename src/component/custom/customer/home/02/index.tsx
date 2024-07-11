import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"

export default function UsageForm() {
	return (
		<div className="flex h-fit gap-[24px] pb-[45px] pt-[30.5px]">
			<ReservationForm />
			<PastHistoryForm />
		</div>
	)
}
function ReservationForm() {
	return (
		<div className="flex h-fit w-[690px] flex-col justify-center gap-[16.5px] rounded-[26px] px-[25px] py-[22px] shadow-customGray60">
			<div className="text-Title03 font-Bold text-PB100">진행 중인 네일</div>
			<div className="flex gap-[16px]">
				<ReservationImageList />
				<ReservationInfo />
			</div>
		</div>
	)
}
function ReservationImageList() {
	const mockImage = [1, 2, 3, 4]
	return (
		<div className="flex flex-col gap-[9px]">
			<div className="h-[174px] w-[173px] rounded-[7px] bg-Gray30"></div>
			<div className="flex gap-[4px]">
				{mockImage.map((_, idx) => (
					<div
						key={idx}
						className="h-[40px] w-[40px] rounded-[4px] bg-Gray30"
					></div>
				))}
			</div>
		</div>
	)
}
function ReservationInfo() {
	return (
		<div className="flex h-fit w-full flex-col gap-[17px]">
			<InfoForm />
			<InfoButtonFrom />
		</div>
	)
}
function InfoForm() {
	return (
		<div className="flex flex-col gap-[12px] border-b-[1.5px] border-Gray10 pb-[25px]">
			<NTContent mode="day" className="px-[15.5px]">
				예약대기중
			</NTContent>
			<div className="flex flex-col gap-[6px]">
				<div className="text-Body01 font-SemiBold text-Gray100">
					모비네일 한남점
				</div>
				<div className="text-Body02 font-SemiBold text-PB100">
					6월 27일 (목요일) 오후 1:00 - 2:00
				</div>
				<div className="text-Body02 text-Gray100">
					2인 동반 시술, 케어, 사진등록, 타샵 제거 있음, 연장 필요 없음
				</div>
			</div>
		</div>
	)
}
function InfoButtonFrom() {
	return (
		<div className="flex w-full items-center justify-between pr-[2px]">
			<InfoButtonList />
			<div className="flex h-fit items-center gap-[11px] text-Button font-Medium text-Gray60">
				<span>예약상세 바로가기</span>
				<NTIcon
					icon="expandRight"
					className="flex h-[21px] w-[21px] text-center text-Gray60"
				/>
			</div>
		</div>
	)
}
function InfoButtonList() {
	return (
		<div className="flex gap-[22px]">
			<NTButton variant="secondary" flexible="fit">
				예약취소
			</NTButton>
			<NTButton variant="primary" flexible="fit">
				시간변경
			</NTButton>
		</div>
	)
}
function PastHistoryForm() {
	return (
		<div className="flex h-fit w-[486px] flex-col justify-center gap-[21.5px] rounded-[26px] px-[21px] pb-[20px] pt-[22px] shadow-customGray60">
			<div className="text-Title03 font-SemiBold text-Gray100">
				다시 돌아보는 지난 네일
			</div>
			<PastHistoryImageList />
		</div>
	)
}
function PastHistoryImageList() {
	return (
		<div className="flex gap-[12px]">
			<div className="flex h-[220px] w-[326px] items-end rounded-l-[26px] bg-gradient-to-t from-Black to-White pb-[20px] pl-[22px] opacity-[0.52]">
				<div className="flex h-[30px] items-center gap-[3px] text-Title03 font-SemiBold text-White">
					<span>4월 카타네일</span>
					<NTIcon icon="expandRight" className="h-[30px] w-[30px] text-White" />
				</div>
			</div>
			<div className="flex w-fit flex-col gap-[8px]">
				<div className="flex h-[106px] w-[106px] items-end rounded-r-[26px] bg-gradient-to-t from-Black to-White pb-[6px] pl-[8.5px] opacity-[0.52]">
					<div className="text-Headline02 text-Gray10">3월</div>
				</div>
				<div className="flex h-[106px] w-[106px] items-end rounded-r-[26px] bg-gradient-to-t from-Black to-White pb-[6px] pl-[8.5px] opacity-[0.52]">
					<div className="text-Headline02 text-Gray10">2월</div>
				</div>
			</div>
		</div>
	)
}
