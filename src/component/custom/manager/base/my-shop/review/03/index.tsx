import { NTButton } from "@/component/common/atom/nt-button"

export default function Manager_Base_MyShop_Review_03() {
	return (
		<div className="mt-[18px] flex w-full flex-col gap-[25px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<ManagerResponse />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<ManagerResponse />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01() {
	return (
		<div className="flex w-full flex-col gap-[16px] border-[5px] border-green-300">
			<Manager_Base_MyShop_Review_03_01_01 />
			<Manager_Base_MyShop_Review_03_01_02 />
			<Manager_Base_MyShop_Review_03_01_03 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_01() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_02() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_03() {
	return (
		<div className="flex h-fit min-h-[65px] w-full gap-[36px] border-[5px] border-blue-300">
			<Manager_Base_MyShop_Review_03_01_03_01 />
			<Manager_Base_MyShop_Review_03_01_03_02 />
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
function ManagerResponse() {
	return (
		<div className="flex h-fit min-h-[178.98px] w-full justify-between rounded-[26px] pt-[18.5px] shadow-customGray60">
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
