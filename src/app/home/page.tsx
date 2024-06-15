"use client"

import { NTButton } from "@/component/common/atom/nt-button"
// import { NTButton } from "@/component/common/atom/nt-button"
import NTToolbar from "@/component/common/atom/nt-toolbar"
import NTIcon from "@/component/common/nt-icon"
import {
	NTModalContent,
	NTModalDivider,
	NTModalFooter,
	NTModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTOption from "@/component/common/nt-option"
import Calendar from "@/component/custom/home/calender"
import { useOption, useToolbar } from "@/hook/use-component"

export default function HomeUser() {
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"디자인",
		"소식",
		"리뷰",
	])
	return (
		<div>
			<ReserVationSection />
			<div className="h-full w-full">
				<div className="flex w-full items-center justify-center border-b-[1px] border-b-Gray20">
					<NTToolbar
						arr={toolbarArr}
						isSelected={hadleSelected}
						selected={isSelected}
						position="bottom"
					/>
				</div>
				<InfoSection />
			</div>
		</div>
	)
}

function ReserVationSection() {
	const { checkedOption, onClickOption, optionArr } = useOption([
		"오전11시",
		"오후1시",
		"오후2시",
		"오후3시",
	])
	const {
		checkedOption: checkedOption2,
		onClickOption: onClickOption2,
		optionArr: optionArr2,
	} = useOption(["오전11시", "오후1시", "오후3시"])
	const {
		checkedOption: checkedOption3,
		onClickOption: onClickOption3,
		optionArr: optionArr3,
	} = useOption(["1인", "2인 동반"])
	const { onOpen } = useModal()

	return (
		<div className="h-full w-full pt-6">
			<h2 className="text-Title03 font-SemiBold text-Gray100">에약 일시</h2>
			<div className="flex h-fit w-full justify-between">
				<div className="h-fit w-[43rem]">
					<div className="mx-auto h-fit w-full">
						<Calendar />
					</div>
					<NTButton
						onClick={() => {
							onOpen({
								size: "big",
								children: <ProcedureDetail />,
							})
						}}
						size={"large"}
						variant={"tertiary"}
						className="w-full"
					>
						예약하기
					</NTButton>
				</div>
				<div className="flex h-fit w-[30rem] flex-col items-stretch">
					<p className="w-full py-4 text-center text-Headline02 text-[18px] font-SemiBold">
						6월 27일 (목요일)
					</p>
					<div className="w-full border-y-[1.5px] border-y-BGblue02 pb-6 pt-4">
						<NTOption {...{ checkedOption, optionArr, onClickOption }} />
						<NTOption
							checkedOption={checkedOption2}
							optionArr={optionArr2}
							onClickOption={onClickOption2}
						/>
					</div>
					<div className="w-full pt-4">
						<NTOption
							checkedOption={checkedOption3}
							optionArr={optionArr3}
							onClickOption={onClickOption3}
						/>
					</div>
					<p className="pl-2 pt-4 text-[16px] font-Regular text-Gray50">
						2인 동반 선택시에는 두 타임 예약 부탁드립니다 :)
					</p>
					<NTButton variant={"tertiary"} size={"large"}>
						전화하기
					</NTButton>
				</div>
			</div>
		</div>
	)
}

function InfoSection() {
	return (
		<div>
			<ShopInfoSummaryArr />
			<div className="pt-6">
				<h2 className="text-Title03 font-SemiBold text-Gray100">네일샵 공지</h2>
				<ShopPostArr />
			</div>
		</div>
	)
}

function ShopInfoSummaryCard() {
	return (
		<div className="h-[10.5rem] w-[17.5rem] rounded-[26px] px-6 py-6 shadow-xl">
			<div className="flex w-full items-center justify-between pb-2">
				<h2 className="text-Headline02 text-[18px] font-SemiBold">영업시간</h2>
				<NTIcon
					icon="expandRight"
					className="h-5 w-5 font-SemiBold text-Gray30"
				/>
			</div>
			<hr className="w-full border-Gray20" />
			<div className="h-fit w-full">
				<div className="flex items-center">
					<NTIcon icon="dot" />
					<p className="truncate text-Body01 font-Light">월화수목금토일</p>
				</div>
			</div>
		</div>
	)
}
function ShopInfoSummaryArr() {
	return (
		<div className="flex w-full items-center justify-between">
			<ShopInfoSummaryCard />
			<ShopInfoSummaryCard />
			<ShopInfoSummaryCard />
			<ShopInfoSummaryCard />
		</div>
	)
}

function ShopPostArr() {
	return (
		<div>
			<ShopPostCard />
			<ShopPostCard />
			<ShopPostCard />
			<ShopPostCard />
		</div>
	)
}

function ShopPostCard() {
	return (
		<div className="flex h-[10rem] w-full rounded-[26px] p-4 shadow-xl">
			<div className="bg-green-200 px-6">이미지자리</div>
			<div>
				<p className="text-Headline02 font-Regular text-PB100">2024.05.28</p>
				<p className="text-Body01 text-Gray80">
					게시글 목록입니다 글자수가 너무많아지면 어떻게하지? 4줄제한?
					line-clamp-4적용하면 되는데
				</p>
				<p className="text-Callout text-Gray30">좋아요50 , 댓글50</p>
			</div>
		</div>
	)
}

function ProcedureDetail() {
	const { onClose } = useModal()
	const {
		checkedOption: checkedProcedureOptionArr,
		onClickOption: onClickProcedureOption,
		optionArr: procedureOptionArr,
	} = useOption(["이달의 아트", "케어", "원 컬러", "사진 등록"])
	const {
		checkedOption: checkedRemovingOption,
		onClickOption: onClickRemovingOption,
		optionArr: removingOptionArr,
	} = useOption(["자샵 제거 필요", "타샵 제거 필요", "제거 필요 없음"])
	const {
		checkedOption: checkedExtensionOptionArr,
		onClickOption: onClickExtensionOption,
		optionArr: extensionOptionArr,
	} = useOption(["연장 필요", "연장 필요 없음"])
	const {
		checkedOption: checkedNailConditionArr,
		onClickOption: onClickNailCondition,
		optionArr: nailConditionArr,
	} = useOption(["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"])

	return (
		<>
			<NTModalHeader size="big" align="left">
				세부 시술 내용
			</NTModalHeader>
			<NTModalDivider color="dark" weight="bold" />
			<NTModalContent className="flex flex-col gap-4 p-4">
				<p className="text-Headline02">시술 내용</p>
				<NTOption
					size="large"
					optionArr={procedureOptionArr}
					onClickOption={onClickProcedureOption}
					checkedOption={checkedProcedureOptionArr}
				/>
				<NTModalDivider />

				<p className="text-Headline02">네일 제거 유무</p>
				<NTOption
					size="large"
					optionArr={removingOptionArr}
					onClickOption={onClickRemovingOption}
					checkedOption={checkedRemovingOption}
				/>
				<NTModalDivider />

				<p className="text-Headline02">연장 유무</p>
				<NTOption
					size="large"
					optionArr={extensionOptionArr}
					onClickOption={onClickExtensionOption}
					checkedOption={checkedExtensionOptionArr}
				/>
				<NTModalDivider />
				<p className="text-Headline02">컨디션</p>
				<NTOption
					size="large"
					optionArr={nailConditionArr}
					onClickOption={onClickNailCondition}
					checkedOption={checkedNailConditionArr}
				/>
			</NTModalContent>
			<NTModalDivider color="dark" weight="bold" size="big" />
			<NTModalFooter>
				<NTButton onClick={onClose}>좋아요</NTButton>
			</NTModalFooter>
		</>
	)
}
