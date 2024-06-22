import { NTButton } from "@/component/common/atom/nt-button"

export default function Manager_Base_MyShop_Review_03() {
	const imageSrc = [false, true, false, true, false]
	//윗부분 삭제예정 예시 보여드릴려고
	return (
		<div className="mt-[18px] flex w-full flex-col gap-[25px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_03_01 imageSrc={imageSrc[0]} />
			<Manager_Base_MyShop_Review_03_01 imageSrc={imageSrc[1]} />
			<Manager_Base_MyShop_Review_03_01 imageSrc={imageSrc[2]} />
			<Manager_Base_MyShop_Review_03_01 imageSrc={imageSrc[3]} />
			<Manager_Base_MyShop_Review_03_01 imageSrc={imageSrc[4]} />
		</div>
	)
}
type imgaeSrcPT = {
	imageSrc: boolean
}
function Manager_Base_MyShop_Review_03_01({ imageSrc }: imgaeSrcPT) {
	return (
		<div className="flex w-full flex-col gap-[16px] border-[5px] border-green-300">
			<Manager_Base_MyShop_Review_03_01_01 />
			<Manager_Base_MyShop_Review_03_01_02 />
			<ReivewCommentGroup imageSrc={imageSrc} />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_01() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_02() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
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
