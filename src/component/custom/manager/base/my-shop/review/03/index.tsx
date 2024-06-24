import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
export default function ReviewList() {
	const imageSrc = [false, true, false, true, false]
	//윗부분 삭제예정 예시 보여드릴려고
	return (
		<div className="flex w-full flex-col">
			<ReviewListItem imageSrc={imageSrc[0]} />
<<<<<<< design/manager-base-schedule-this-week
			<hr />
			<ReviewListItem imageSrc={imageSrc[1]} />
			<hr />
			<ReviewListItem imageSrc={imageSrc[2]} />
			<ManagerResponse />
			<hr />
			<ReviewListItem imageSrc={imageSrc[3]} />
			<hr />
=======
			<hr className="border-t-[1.5px] border-Gray20" />
			<ReviewListItem imageSrc={imageSrc[1]} />
			<hr className="border-t-[1.5px] border-Gray20" />
			<ReviewListItem imageSrc={imageSrc[2]} />
			<ManagerResponse />
			<hr className="border-t-[1.5px] border-Gray20" />
			<ReviewListItem imageSrc={imageSrc[3]} />
			<hr className="border-t-[1.5px] border-Gray20" />
>>>>>>> main
			<ReviewListItem imageSrc={imageSrc[4]} />
			<ManagerResponse />
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
				<div className="flex w-full gap-[36px]">
					<ReivewCommentImgae />
					<ReivewComment />
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
function ReivewCommentImgae() {
	return (
		<div className="h-[164.85px] w-[180px] rounded-[26px] shadow-customGray80"></div>
	)
}
//사진 들어가면 border삭제 예정 또한 div > image변경예정
function ReivewComment() {
	return (
		<div className="line-clamp-5 h-fit w-[631px] text-Title03 text-Gray80">
			젠가 그대가 원한다면 Only we’ve been seeing what we need my bad 우리에게
			필요한 건 우리만 아니까 If you’re sober I’ll feel fine 그대가 취하지
			않았다면 난 괜찮을 거예요 If we get away, could we be like that? 만약 함께
			떠난다면 우리에게 사랑이 올까요? Sometime if you want me like that 언젠가
			그대가 원한다면 Only we’ve been seeing what we need my bad 우리에게 필요한
			건 우리만 아니까 If you’re sober I’ll feel fine 그대가 취하지 않았다면 난
			괜찮을 거예요 Oh oh oh oh (give it to me) 오 오 오 오 (신호를 줘요) Oh oh
			oh oh (give it to me) 오 오 오 오 (내가 알 수 있도록) Oh oh oh o
		</div>
	)
}
function ManagerResponse() {
	return (
		<div className="mb-[27px] flex h-fit min-h-[178.98px] w-full justify-between rounded-[26px] pt-[18.5px] shadow-customGray60">
			<div className="ml-[36px] flex flex-col gap-[18px] pt-[6px]">
				<div className="flex items-center gap-[12px]">
					<div className="text-Headline02 font-SemiBold text-Gray80">
						모비네일 원장 모비
					</div>
					<div className="flex text-Callout text-Gray50">이번주</div>
				</div>
				<div className="line-clamp-5 text-Title03 font-Regular text-Gray80">
					다음에 오시면 더 잘해드릴게요
					<br />
					리뷰 남겨주셔서 감사합니다 ㅎㅎ
				</div>
			</div>
			<div className="mr-[21px] flex flex-col gap-[16px]">
				<NTButton variant="secondary" size="large">
					수정하기
				</NTButton>
				<NTButton variant="secondary" size="large">
					삭제하기
				</NTButton>
			</div>
		</div>
	)
}
