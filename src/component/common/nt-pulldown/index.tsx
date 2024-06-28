import React, { useEffect, useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

type NTPulldownPT = {
	placeholder: string
	description?: string | undefined
	optionArr: Array<string>
	isOpen: boolean
	clickedOption: string
	boxRef: React.RefObject<HTMLDivElement>
	onClickWrapper: VoidFunction
	onClickTrigger: VoidFunction
	onClickItems: (item: string) => void
}
type NTPulldownTriggerPT = {
	placeholder: string
	isOpen: boolean
	clickCallback: VoidFunction
}
type NTPulldownItemsPT = {
	description?: string | undefined
	optionArr: Array<string>
	clickCallback: (option: string) => void
	clickedOption: string
	isVisible: boolean
}

export default function NTPulldown({
	description,
	placeholder,
	optionArr,
	isOpen,
	clickedOption,
	onClickItems,
	onClickTrigger,
	onClickWrapper,
	boxRef,
}: NTPulldownPT) {
	const [isVisible, setIsVisible] = useState(isOpen)

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
		} else {
			const timer = setTimeout(() => setIsVisible(false), 500)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	return (
		<div className="relative h-fit w-fit" onBlur={onClickWrapper} ref={boxRef}>
			<NTPulldownTrigger
				placeholder={placeholder}
				isOpen={isOpen}
				clickCallback={onClickTrigger}
			/>

			{isVisible && (
				<NTPulldownItems
					description={description}
					optionArr={optionArr}
					clickCallback={onClickItems}
					clickedOption={clickedOption}
					isVisible={isOpen}
				/>
			)}
		</div>
	)
}

function NTPulldownTrigger({
	placeholder,
	isOpen,
	clickCallback,
}: NTPulldownTriggerPT) {
	return (
		<div
			className={
				"flex h-fit w-fit items-center justify-center gap-x-[8px] rounded-[35px] border-[0.5px] border-Gray40 px-6 py-[10px] hover:border-transparent hover:bg-Gray10"
			}
			onClick={() => clickCallback()}
		>
			<div className="text-Body01 text-Gray70">{placeholder}</div>
			<NTIcon
				icon="expandDownLight"
				className={cn(
					"h-6 w-6 text-Gray70 transition-all duration-75",
					isOpen ? "-rotate-180" : "",
				)}
			/>
		</div>
	)
}

function NTPulldownItems({
	description,
	optionArr,
	clickCallback,
	clickedOption,
	isVisible,
}: NTPulldownItemsPT) {
	return (
		<div
			className={cn(
				"absolute left-1/2 top-full z-10 mt-2 w-[15rem] -translate-x-1/2 transform overflow-hidden rounded-[14px] border-[0.5px] border-Gray40 bg-white shadow-lg transition-all duration-500 ease-in-out",
				isVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
			)}
		>
			<div className="h-fit w-full">
				<div className="h-fit w-full px-3 py-[13px] text-Body01 font-SemiBold text-Black">
					{description}
				</div>
				{optionArr.map((item, idx) => (
					<div
						className={cn(
							"flex h-fit w-full cursor-pointer items-center justify-between border-t-[1.5px] border-t-Gray10 px-6 py-[10px] transition-all duration-100 hover:bg-Gray10",
							idx === optionArr.length - 1 && "rounded-b-[14px]",
						)}
						onMouseDown={() => clickCallback(item)}
						key={idx}
					>
						<p className="text-Body02 text-Gray70">{item}</p>
						<NTIcon
							icon="check"
							className={cn(
								"h-6 w-6",
								clickedOption === optionArr[idx] ? "opacity-100" : "opacity-0",
							)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
