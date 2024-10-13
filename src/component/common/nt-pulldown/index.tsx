"use client"
import { cva } from "class-variance-authority"
import type {
	Dispatch,
	HTMLAttributes,
	ReactNode,
	RefObject,
	SetStateAction,
} from "react"
import { createContext, useContext, useRef, useState } from "react"

import { cn } from "@/config/tailwind"

import NTIcon from "../nt-icon"

// Context 타입 정의
type TNTPulldownContext = {
	isOpen: boolean
	clickedIdx: number
	toggleOpen: () => void
	selectIdx: (option: number) => void
	boxRef: RefObject<HTMLDivElement>
	triggerRef: RefObject<HTMLDivElement>
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

// Pulldown의 상태 및 기능을 제공하는 Context 생성
const NTPulldownContext = createContext<TNTPulldownContext | undefined>(
	undefined,
)

// Context를 사용하는 커스텀 훅
export const useNTPulldown = () => {
	const context = useContext(NTPulldownContext)
	if (!context) {
		throw new Error("useNTPulldown must be used within a NTPulldownProvider")
	}
	return context
}

/**
 * ------------------------ NTPulldownProvider ------------------------
 * Pulldown 컴포넌트를 감싸고 상태 및 기능을 Context로 제공합니다.
 *
 * @param children - Pulldown 컴포넌트에 포함될 자식 요소들
 *
 */
type NTPulldownProviderPT = {
	children: ReactNode
}

export function NTPulldownProvider({ children }: NTPulldownProviderPT) {
	const [isOpen, setIsOpen] = useState(false)
	const [clickedIdx, setClickedIdx] = useState(-1)
	const boxRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const toggleOpen = () => setIsOpen(!isOpen)
	const selectIdx = (option: number) => {
		setClickedIdx(option)
		setIsOpen(false)
	}

	/**
	 * Blur 이벤트를 처리하여, Pulldown이 열린 상태에서 포커스가
	 * Pulldown 외부로 이동하면 닫히게 합니다.
	 *
	 * @param event - FocusEvent 객체
	 */
	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (
			boxRef.current &&
			!boxRef.current.contains(event.relatedTarget as Node) &&
			triggerRef.current &&
			!triggerRef.current.contains(event.relatedTarget as Node)
		) {
			setIsOpen(false)
		}
	}

	return (
		<NTPulldownContext.Provider
			value={{
				isOpen,
				clickedIdx,
				toggleOpen,
				selectIdx,
				boxRef,
				triggerRef,
				setIsOpen,
			}}
		>
			<div className="h-fit w-fit" onBlur={handleBlur} tabIndex={-1}>
				{children}
			</div>
		</NTPulldownContext.Provider>
	)
}

/**
 * ------------------------ NTPulldownTrigger ------------------------
 * Pulldown을 열고 닫는 트리거 역할을 하는 컴포넌트입니다.
 *
 * @param children - 트리거로 사용할 내용
 * @param className - 추가적인 CSS 클래스
 *
 */
type NTPulldownTriggerPT = {
	children: ReactNode
	className?: string
	hasArrow?: boolean
}

export function NTPulldownTrigger({
	children,
	className,
	hasArrow = true,
}: NTPulldownTriggerPT) {
	const { toggleOpen, triggerRef, isOpen } = useNTPulldown()
	return (
		<div
			ref={triggerRef}
			onClick={toggleOpen}
			tabIndex={0}
			className={cn(
				"flex cursor-pointer items-center justify-between gap-x-1 rounded-[6px] border-2 border-Gray20 bg-White px-[6px] py-[8px] transition-all duration-500 ease-in-out hover:border-Gray40",
				isOpen && "border-PB50 hover:border-PB50",
				className,
			)}
		>
			{children}
			{hasArrow && (
				<NTIcon
					icon="expandDownLight"
					className={cn(
						"h-6 w-6 text-Gray40 transition-all duration-75",
						isOpen ? "-rotate-180" : "",
					)}
				/>
			)}
		</div>
	)
}

/**
 * ------------------------ NTPulldownContent ------------------------
 * Pulldown의 내용을 표시하는 컴포넌트입니다.
 * `isOpen` 상태에 따라 내용을 보여주거나 숨깁니다. `position` prop을 통해 내용의 위치를 조절할 수 있습니다.
 *
 * @param children - Pulldown의 항목들
 * @param className - 추가적인 CSS 클래스
 * @param position - 내용의 위치를 조절 (center, left, right)
 *
 */
type NTPulldownContentPT = {
	children: ReactNode
	className?: string
	position?:
		| "centerBottom"
		| "leftBottom"
		| "rightBottom"
		| "centerTop"
		| "leftTop"
		| "rightTop"
}

const positionVariants = cva(
	"absolute top-full z-10 mt-2 w-[13rem] overflow-hidden bg-white shadow-lg transition-all duration-500 ease-in-out",
	{
		variants: {
			position: {
				centerBottom: "left-1/2 -translate-x-1/2 transform", // 아래 중앙
				leftBottom: "left-0", // 아래 왼쪽
				rightBottom: "right-0", // 아래 오른쪽
				centerTop: "left-1/2 -translate-x-1/2 -top-4 -translate-y-full", // 위 중앙
				leftTop: "left-0 -top-4 -translate-y-full", // 위 왼쪽
				rightTop: "right-0 -top-4 -translate-y-full", // 위 오른쪽
			},
		},
		defaultVariants: { position: "centerBottom" },
	},
)

export function NTPulldownContent({
	children,
	className,
	position,
}: NTPulldownContentPT) {
	const { isOpen, boxRef } = useNTPulldown()

	return (
		<div
			ref={boxRef}
			className={cn(
				positionVariants({ position }),
				"scrollbar-none overflow-y-scroll rounded-xl border-2 border-Gray10 transition-all duration-500 ease-in-out",
				isOpen ? "max-h-[300px] opacity-100" : "h-[0px] opacity-0",
				className,
			)}
		>
			{children}
		</div>
	)
}

/**
 * ------------------------ NTPulldownLabel ------------------------
 * Pulldown의 제목 또는 레이블을 표시하는 컴포넌트입니다.
 *
 * @param children - 레이블로 사용할 내용
 * @param className - 추가적인 CSS 클래스
 *
 */
type NTPulldownLabelPT = { children: ReactNode; className?: string }
export function NTPulldownLabel({ children, className }: NTPulldownLabelPT) {
	return (
		<div
			className={cn(
				"border-b-[1px] border-Gray40 px-2 py-3 text-Body01 font-SemiBold text-Gray80",
				className,
			)}
		>
			{children}
		</div>
	)
}

/**
 * ------------------------ NTPulldownItem ------------------------
 * Pulldown에서 선택할 항목을 표시하는 컴포넌트입니다.
 *
 * @param children - 항목으로 사용할 내용
 * @param className - 추가적인 CSS 클래스
 * @param onClick - 항목 클릭 시 호출되는 이벤트 핸들러
 *
 */
type NTPulldownItemPT = {
	children: ReactNode
	className?: string
} & HTMLAttributes<HTMLDivElement>
export function NTPulldownItem({
	children,
	className,
	onClick,
	...rest
}: NTPulldownItemPT) {
	return (
		<div
			className={cn(
				"flex cursor-pointer items-center justify-between border-y border-Gray10 px-4 py-2 text-Body01 transition-all duration-300 ease-in-out hover:bg-Gray10",
				className,
			)}
			{...rest}
			onMouseDown={onClick}
		>
			{children}
		</div>
	)
}
