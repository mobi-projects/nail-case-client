"use client"

import { cn } from "@/config/tailwind"

import NTIcon from "../../nt-icon"

type NTPulldownPT = {
	optionArr: Array<string>
	isOpen: boolean
	onClickWrapper: VoidFunction
	onClickTrigger: VoidFunction
	onClickItems: (idx: number) => void
}
type NTPulldownTriggerPT = {
	isOpen: boolean
	optionArr: Array<string>
	clickCallback: VoidFunction
}
type NTPulldownItemsPT = {
	optionArr: Array<string>
	clickCallback: (option: number) => void
	isOpen: boolean
}
type NTArrowPT = {
	isOpen: boolean
	className?: string
}
/**
 * @description - usePulldown(initialArr) 의 return값들을 props로전달
 */
export default function NTPulldown({
	optionArr,
	isOpen,
	onClickItems,
	onClickTrigger,
	onClickWrapper,
}: NTPulldownPT) {
	return (
		<div
			className={cn(
				"w-[151px] cursor-pointer border-[0.5px] border-Gray40 hover:border-transparent hover:bg-Gray10",
				isOpen
					? "rounded-[14px] hover:border-[0.5px] hover:border-Gray40 hover:bg-transparent"
					: "rounded-[35px]",
			)}
			onBlur={onClickWrapper}
		>
			<NTPulldownTrigger
				isOpen={isOpen}
				clickCallback={onClickTrigger}
				optionArr={optionArr}
			/>
			{isOpen && (
				<NTPulldownItems
					optionArr={optionArr}
					clickCallback={onClickItems}
					isOpen={isOpen}
				/>
			)}
		</div>
	)
}

function NTArrow({ isOpen, className }: NTArrowPT) {
	const arrowDirection = isOpen ? "check" : "expandDownLight"
	return (
		<NTIcon
			icon={arrowDirection}
			className={cn("h-5 w-5 text-Gray70", isOpen && "text-Gray30", className)}
		/>
	)
}

function NTPulldownTrigger({
	isOpen,
	optionArr,
	clickCallback,
}: NTPulldownTriggerPT) {
	return (
		<button
			className={cn(
				"group flex w-full items-center justify-between bg-transparent px-6 py-[10px]",
				isOpen && "rounded-t-[14px]",
			)}
			onClick={() => clickCallback()}
		>
			<div className="text-Body01 text-Gray70">{optionArr[0]}</div>
			<NTArrow
				isOpen={isOpen}
				className={cn("", isOpen && "group-hover:text-Gray100")}
			/>
		</button>
	)
}

function NTPulldownItems({
	optionArr,
	clickCallback,
	isOpen,
}: NTPulldownItemsPT) {
	const itemArrExcludeFirst = getItemArrExcludeFirst(optionArr)
	return (
		<div className="h-fit w-full">
			{itemArrExcludeFirst.map((item, idx) => (
				<div
					key={idx}
					className={cn(
						"group",
						isLastItem(itemArrExcludeFirst.length, idx) && "rounded-b-[14px]",
					)}
				>
					<hr className="w-full bg-Gray10" />
					<div
						className="flex h-fit w-full items-center justify-between px-6 py-[10px] text-Body01 text-Gray70"
						onMouseDown={() => clickCallback(idx)}
					>
						{item}
						<NTArrow isOpen={isOpen} className="group-hover:text-Gray100" />
					</div>
				</div>
			))}
		</div>
	)
}

const isLastItem = (length: number, idx: number): boolean => {
	return idx + 1 === length ? true : false
}
const getItemArrExcludeFirst = (arr: Array<string>) => {
	return arr.slice(1)
}
