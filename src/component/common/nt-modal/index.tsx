import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { useEffect, type HTMLAttributes, type PropsWithChildren } from "react"

import { cn } from "@/config/tailwind"
import { useControlBodyScroll } from "@/hook/use-prevent-scroll"

import NTIcon from "../nt-icon"

import { useModal } from "./nt-modal.context"

export const ModalVariants = cva(
	"fixed bottom-[50%] left-[50%] right-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[26px] bg-white ",
	{
		variants: {
			size: {
				exSmall:
					"h-[50vh] min-w-[400px] max-w-[90dvw] p-4 aspect-[8/11] max-sm:min-w-0 max-sm:w-[80%] ",
				small:
					"h-[80dvh] aspect-[8/11] min-w-[300px] max-w-[90dvw] py-[28px] px-[28px] lg:h-[70dvh] max-md:h-[50dvh] max-lg:py-2 max-lg:px-5 max-lg:min-w-0",
				large: "h-[85dvh] aspect-[18/19] min-w-[400px] max-w-[90dvw] p-[46px]",
			},
		},
		defaultVariants: {
			size: "small",
		},
	},
)

type NTModalPT = HTMLAttributes<HTMLDialogElement> &
	VariantProps<typeof ModalVariants> &
	PropsWithChildren & {
		isX?: boolean
	}

export default function NTModal({
	size = "small",
	children,
	isX = true,
	className,
}: NTModalPT) {
	const { onCloseModal } = useModal()
	const { pauseBodyScroll, restartBodyScroll } = useControlBodyScroll()

	useEffect(() => {
		const prevScrollY = pauseBodyScroll()
		return () => {
			restartBodyScroll(prevScrollY)
		}
	}, [pauseBodyScroll, restartBodyScroll])

	return (
		<div
			onClick={onCloseModal}
			className={cn(
				"fixed left-0 top-0 z-50 h-full w-full overflow-hidden bg-Black/30 focus-visible:outline-none",
				className,
			)}
			onScroll={(e) => {
				e.preventDefault()
			}}
		>
			<ModalContainer className={cn(ModalVariants({ size }))} {...{ isX }}>
				{children}
			</ModalContainer>
		</div>
	)
}
NTModal.displayName = "NTModal"

function ModalContainer({
	children,
	isX,
	className,
}: NTModalPT & HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={className}
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			{isX && <CancelButton />}
			{children}
		</div>
	)
}

function CancelButton() {
	const { onCloseModal } = useModal()
	return (
		<div className="relative">
			<NTIcon
				icon="delete"
				className="absolute right-0 top-0 aspect-square h-[18px] translate-x-[25px] translate-y-[-15px] text-Gray40"
				onClick={onCloseModal}
			/>
		</div>
	)
}

export function ModalContent({
	children,
	...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return (
		<div className={cn("flex h-full w-full flex-col", rest.className)}>
			{children}
		</div>
	)
}

export function ModalHeader({
	children,
	...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return (
		<div className={cn("mb-auto h-fit w-full", rest.className)}>{children}</div>
	)
}
export function ModalBody({
	children,
	...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return (
		<div
			className={cn(
				"scrollbar-custom h-fit w-full shrink grow overflow-y-auto",
				rest.className,
			)}
		>
			{children}
		</div>
	)
}
export function ModalFooter({
	children,
	...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
	return (
		<div className={cn("mt-auto h-fit w-full", rest.className)}>{children}</div>
	)
}
