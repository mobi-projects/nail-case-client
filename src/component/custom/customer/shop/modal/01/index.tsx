import type { ComponentProps, Dispatch, SetStateAction } from "react"
import { useCallback, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTHoverCard from "@/component/common/nt-hover-card"
import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTOption from "@/component/common/nt-option"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import ReservationConfirmModal from "../02"

type TReservationOptions<T> = {
	labelArr: Array<string>
	valueArr: Array<T>
}
const TREATMENT_OPTIONS: TReservationOptions<TNailTreatment> = {
	labelArr: ["이달의 아트", "케어", "원 컬러", "사진등록"],
	valueArr: ["AOM", "CARE", "ONE", "MEMBER_IMAGE"],
} as const
const REMOVE_OPTIONS: TReservationOptions<TRemoveOption> = {
	labelArr: ["자샵 제거 필요", "타샵 제거 필요", "제거 필요 없음"],
	valueArr: ["IN_SHOP", "ELSE_WHERE", "NO_NEED"],
} as const
const EXTENSION_OPTIONS: TReservationOptions<boolean> = {
	labelArr: ["연장 필요", "연장 필요 없음"],
	valueArr: [true, false],
} as const
const CONDITION_OPTIONS: TReservationOptions<TNailCondition> = {
	labelArr: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
	valueArr: ["REPAIR", "AS", "WOUND_CARE", "CORRECTION"],
} as const

type CreationReservationModal = {
	startTime: number
	endTime: number
}

const UNSELECTED_IDX = -1

export default function CreationReservationModal({
	startTime,
	endTime,
}: CreationReservationModal) {
	const [treatmentIdx, setTreatmentOptionIdx] = useState<number>(UNSELECTED_IDX)
	const [removeIdx, setRemoveIdx] = useState<number>(UNSELECTED_IDX)
	const [extensionIdx, setExtensionIdx] = useState<number>(UNSELECTED_IDX)
	const [conditionIdxArr, setConditionIdxArr] = useState<number[]>([])

	const onSelectOptionOne = useCallback(
		(setOptionOne: Dispatch<SetStateAction<number>>) => {
			return (idx: number) =>
				setOptionOne((prev) => {
					if (prev === idx) return -1
					return idx
				})
		},
		[],
	)
	const onSelectOptionArray = useCallback(
		(
			optionIdxArr: number[],
			setOptionArr: Dispatch<SetStateAction<number[]>>,
		) => {
			return (idx: number) => {
				if (optionIdxArr.includes(idx)) {
					setOptionArr((prevArr) =>
						prevArr.filter((selectedIdx) => selectedIdx !== idx),
					)
				} else setOptionArr((prevArr) => [...prevArr, idx])
			}
		},
		[],
	)

	return (
		<ModalContent>
			<ModalHeader className="h-[60px] border-b-[1.5px] border-Gray20">
				<ModalTitle />
			</ModalHeader>
			<ModalBody>
				<div className="my-[17px] flex h-fit min-h-[105px] w-full flex-col gap-[8px]">
					<SectionTitle title="시술 내용" isEssential={true} />
					<NTOption
						optionArr={TREATMENT_OPTIONS.labelArr}
						selectedIdxArr={[treatmentIdx]}
						size="large"
						disabledIdxArr={[3]}
						onSelect={onSelectOptionOne(setTreatmentOptionIdx)}
					/>
				</div>
				<hr className="h-[2px] w-full bg-Gray10" />
				<div className="my-[17px] flex h-fit min-h-[105px] w-full flex-col gap-[8px]">
					<SectionTitle title="네일 제거 유무" isEssential={true} />
					<NTOption
						optionArr={REMOVE_OPTIONS.labelArr}
						selectedIdxArr={[removeIdx]}
						size="large"
						onSelect={onSelectOptionOne(setRemoveIdx)}
					/>
				</div>
				<hr className="h-[2px] w-full bg-Gray10" />
				<div className="my-[17px] flex h-fit min-h-[105px] w-full flex-col gap-[8px]">
					<SectionTitle title="연장 유무" isEssential={true} />
					<NTOption
						optionArr={EXTENSION_OPTIONS.labelArr}
						selectedIdxArr={[extensionIdx]}
						size="large"
						onSelect={onSelectOptionOne(setExtensionIdx)}
					/>
				</div>
				<hr className="h-[2px] w-full bg-Gray10" />
				<div className="my-[17px] flex h-fit min-h-[105px] w-full flex-col gap-[8px]">
					<SectionTitle
						title="컨디션"
						isEssential={true}
						additionalNotice="( 복수 선택 가능)"
					/>
					<NTOption
						optionArr={CONDITION_OPTIONS.labelArr}
						selectedIdxArr={conditionIdxArr}
						size="large"
						onSelect={onSelectOptionArray(conditionIdxArr, setConditionIdxArr)}
					/>
				</div>
			</ModalBody>
			<ModalFooter>
				<ConfirmSection
					startTime={startTime}
					endTime={endTime}
					treatment={"AOM"}
					remove={"IN_SHOP"}
					extension={true}
					conditionArr={["AS"]}
					isButtonActive={
						!isSameNumber(treatmentIdx, UNSELECTED_IDX) &&
						!isSameNumber(removeIdx, UNSELECTED_IDX) &&
						!isSameNumber(extensionIdx, UNSELECTED_IDX) &&
						!isSameNumber(conditionIdxArr.length, 0)
					}
				/>
			</ModalFooter>
		</ModalContent>
	)
}

function ModalTitle() {
	return (
		<div className="flex h-fit items-center gap-[8px]">
			<p className="text-Title01 text-Gray90">시술 세부 내용</p>
			<NTHoverCard contants="ׄׄ• 표시가 된 항목은 필수 사항입니다.">
				<NTIcon icon="infoLight" className="h-[24px] text-Gray30" />
			</NTHoverCard>
		</div>
	)
}

type ReservationConfirmModalPT = ComponentProps<
	typeof ReservationConfirmModal
> & {
	isButtonActive: boolean
}

function ConfirmSection({
	startTime,
	endTime,
	treatment,
	remove,
	extension,
	conditionArr,
	isButtonActive,
}: ReservationConfirmModalPT) {
	const { onOpenModal } = useModal()
	const onOpenCheckingModal = () => {
		onOpenModal({
			size: "small",
			children: (
				<ReservationConfirmModal
					{...{
						startTime,
						endTime,
						treatment,
						remove,
						extension,
						conditionArr,
					}}
				/>
			),
		})
	}
	return (
		<div className="flex h-[100px] items-end justify-center">
			<AbsoluteDivider />
			<NTButton
				size="large"
				onClick={onOpenCheckingModal}
				disabled={!isButtonActive}
			>
				확인하기
			</NTButton>
		</div>
	)
}
function SectionTitle({
	title,
	isEssential = false,
	additionalNotice,
}: {
	title: string
	isEssential?: boolean
	additionalNotice?: string
}) {
	return (
		<div className="flex h-fit w-full gap-[1px]">
			<p className="text-Headline02 text-Gray80">{title}</p>
			{isEssential && (
				<div className="aspect-square h-[4px] self-start rounded-full bg-PB100" />
			)}
			{additionalNotice && (
				<p className="self-center text-Caption02 text-Gray40">
					{additionalNotice}
				</p>
			)}
		</div>
	)
}
function AbsoluteDivider() {
	return (
		<hr className="absolute left-0 h-[1.5px] w-full self-start bg-Gray20" />
	)
}

const isSameNumber = (value: number, expect: number) => value === expect
