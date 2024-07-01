import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { forwardRef } from "react"

import { cn } from "@/config/tailwind"

import NTIcon from "../nt-icon"

import { useModal } from "./nt-modal.context"

const ModalVariants = cva(
	"fixed bottom-[50%] left-[50%] right-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[26px] bg-white ",
	{
		variants: {
			size: {
				small:
					"h-[80dvh] aspect-[8/11] min-w-[300px] max-w-[90dvw] py-[28px] px-[28px]",
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
		isX: boolean
	}

const NTModal = forwardRef<HTMLDialogElement, NTModalPT>(
	({ size, children, isX, className }, ref) => {
		const { onCloseModal } = useModal()
		return (
			<dialog
				ref={ref}
				onClick={onCloseModal}
				className={cn(
					"h-full w-full bg-transparent backdrop:bg-Black/30 focus-visible:outline-none",
					className,
				)}
			>
				<ModalContainer className={ModalVariants({ size })} {...{ isX }}>
					{children}
				</ModalContainer>
			</dialog>
		)
	},
)
NTModal.displayName = "NTModal"
export default NTModal

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
