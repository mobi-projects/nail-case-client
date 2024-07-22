"use client"
import { cva } from "class-variance-authority"
import type { HTMLAttributes, ReactNode, RefObject } from "react"
import { createContext, useContext, useRef, useState } from "react"

import { cn } from "@/config/tailwind"

// Context 타입 정의
type TNTPulldownContext = {
	isOpen: boolean
	clickedIdx: number
	toggleOpen: () => void
	selectIdx: (option: number) => void
	boxRef: RefObject<HTMLDivElement>
	triggerRef: RefObject<HTMLDivElement>
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
	const [clickedIdx, setClickedIdx] = useState(0)
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
			value={{ isOpen, clickedIdx, toggleOpen, selectIdx, boxRef, triggerRef }}
		>
			<div className="h-fit w-full" onBlur={handleBlur} tabIndex={-1}>
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
type NTPulldownTriggerPT = { children: ReactNode; className?: string }

export function NTPulldownTrigger({
	children,
	className,
}: NTPulldownTriggerPT) {
	const { toggleOpen, triggerRef } = useNTPulldown()
	return (
		<div
			ref={triggerRef}
			tabIndex={0}
			onClick={toggleOpen}
			className={cn("cursor-pointer", className)}
		>
			{children}
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
	position?: "center" | "left" | "right"
}

const positionVariants = cva(
	"absolute top-full z-10 mt-2 w-[13rem] overflow-hidden bg-white shadow-lg transition-all duration-500 ease-in-out",
	{
		variants: {
			position: {
				center: "left-1/2 -translate-x-1/2 transform",
				left: "left-0",
				right: "right-0",
			},
		},
		defaultVariants: { position: "center" },
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
				isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0",
				"scrollbar-none overflow-y-scroll transition-all duration-500 ease-in-out",
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
	return <div className={className}>{children}</div>
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
			className={cn("transition-all duration-500 ease-in-out", className)}
			{...rest}
			onMouseDown={onClick}
		>
			{children}
		</div>
	)
}
