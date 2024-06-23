import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
export default function Manager_Base_MyShop_Review_03() {
	const imageSrc = [false, true, false, true, false]
	//윗부분 삭제예정 예시 보여드릴려고
	return (
		<div className="mt-[18px] flex w-full flex-col">
			<ReviewListItem imageSrc={imageSrc[0]} />
      	<hr />
			<ReviewListItem imageSrc={imageSrc[1]} />
      	<hr />
			<ReviewListItem imageSrc={imageSrc[2]} />
      	<hr />
			<ReviewListItem imageSrc={imageSrc[3]} />
      	<hr />
			<ReviewListItem imageSrc={imageSrc[4]} />
		</div>
	)
}
type imgaeSrcPT = {
	imageSrc: boolean
}
function ReviewListItem({ imageSrc }: imgaeSrcPT) {
	return (
		<div className="my-[24px] flex w-full flex-col gap-[18px]">
			<ReviewerInfo />
				<ReviewerTag />
			<ReivewCommentGroup imageSrc={imageSrc} />

		</div>
	)
}
function ReviewerInfo() {
	const starGrade = [true, true, true, true, false]
	//윗부분 삭제 예정
	return (
		<div className="flex h-[60px] w-full flex-col gap-[8px]">
			<div className="text-Headline01 font-Bold text-Gray80">닉네임</div>
			<div className="flex gap-[7px]">
				<div className="flex gap-[6px]">
					{starGrade.map((star, idx) => (
						<NTIcon
							icon="starFull"
							key={idx}
							className={`flex h-[18px] w-[18px] text-center ${star ? "text-PB100" : "text-Gray20"}`}
						></NTIcon>
					))}
				</div>
				<div className="text-Callout font-SemiBold text-Gray50">
					<span> 3번째 방문 </span>
					<span className="h-[4px] w-[4px]">﹒</span>
					<span>5월 24일 방문</span>
				</div>
			</div>
		</div>
	)
}
function ReviewerTag() {
	const tagList = [
		"이달의 아트",
		"동반 2인",
		"타샵 제거 있음",
		" 1인 연장 필요",
	]
	return (
		<div className="flex h-[60px] w-full gap-[10px] pt-[3px]">
			{tagList.map((tag, idx) => (
				<div
					key={idx}
					className="h-fit w-fit rounded-[20.34px] bg-BGblue01 px-[18px] py-[12px] text-Body02 text-PB100"
				>
					{tag}
				</div>
			))}
		</div>
	)
}
function ReivewCommentGroup({ imageSrc }: imgaeSrcPT) {
	return (
		<div className="flex h-fit min-h-[30px] w-full items-end justify-between pr-[21px]">
			{imageSrc ? (
				<div className="first-line: flex w-full gap-[36px]">
					<Manager_Base_MyShop_Review_03_01_03_01 />
					<Manager_Base_MyShop_Review_03_01_03_02 />
				</div>
			) : (
				<div className="line-clamp-5 h-fit w-[576px]">
					And I couldn’t be happier to meet you 그대를 만난 게 더 없이 행복해
					Everything you and I could be 우리 사이의 모든 일들이 Could this be
					our love story? 사랑 이야기가 될 수 있을까요? And when I saw you
					standing there 그대가 거기 서 있을 때 You were the only source of
					light 오직 당신에게만 빛이 났어요 I wonder if this is our night 오늘밤
					우리가 어떻게 될지 궁금해요 그대가 거기 서 있을 때 You were the only
					source of light 오직 당신에게만 빛이 났어요
				</div>
			)}
			<NTButton variant="secondary">댓글달기</NTButton>
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_03_01() {
	return (
		<div className="flex h-[165px] w-[180px] border-[5px] border-purple-300"></div>
	)
}
function Manager_Base_MyShop_Review_03_01_03_02() {
	return (
		<div className="flex h-fit min-h-[65px] w-[630px] border-[5px] border-purple-300"></div>
	)
}
