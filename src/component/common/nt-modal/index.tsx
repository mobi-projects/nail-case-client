import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { HTMLAttributes, PropsWithChildren } from "react"

import { cn } from "@/config/tailwind"

import NTIcon from "../nt-icon"

const ModalVariants = cva(
	"relative py-[27px] rounded-[26px] bg-White overflow-x-hidden",
	{
		variants: {
			size: {
				small: "h-[659px] w-[486px] max-h-[659px] px-[28px]",
				big: "h-fit min-h-[786px] max-h-[984px] w-[996px] px-[52px]",
			},
		},
		defaultVariants: {
			size: "small",
		},
	},
)

type NTModalPT = VariantProps<typeof ModalVariants> &
	PropsWithChildren & {
		onClose?: VoidFunction
	}

export default function NTModal({ size, children, onClose }: NTModalPT) {
	return (
		<div
			className="fixed z-50 flex h-full w-full items-center justify-center bg-Black/50"
			onClick={(e) => {
				e.preventDefault
				e.stopPropagation
			}}
		>
			<div className={cn(ModalVariants({ size }))}>
				{size !== "big" && <XButton {...{ onClose }} />}
				{children}
			</div>
		</div>
	)
}

const ModalHeaderVariants = cva(
	"w-full h-[58px] order-first flex flex-col justify-between text-Gray90",
	{
		variants: {
			size: {
				small: "text-Body01",
				big: "text-Title01",
			},
			align: {
				center: "items-center",
				left: "items-start",
			},
		},
		defaultVariants: {
			size: "small",
			align: "center",
		},
	},
)
type NTModalHeaderPT = VariantProps<typeof ModalHeaderVariants> &
	PropsWithChildren
export function NTModalHeader({ size, align, children }: NTModalHeaderPT) {
	return (
		<header className={cn(ModalHeaderVariants({ size, align }))}>
			{children}
			<NTModalDivider weight="bold" color="dark" size="big" />
		</header>
	)
}
export function NTModalContent({
	children,
	className,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("h-fit w-full overflow-x-hidden", className)}>
			{children}
		</div>
	)
}
const ModalDividerVariants = cva("w-full flex justify-center", {
	variants: {
		size: {
			small: "",
			big: "scale-x-[200%]",
		},
		weight: {
			thin: "h-[1px]",
			bold: "h-[2px]",
		},
		color: {
			light: "bg-Gray10",
			dark: "bg-Gray20",
		},
	},
	defaultVariants: {
		size: "small",
		weight: "thin",
		color: "light",
	},
})
export function NTModalDivider({
	size,
	weight,
	color,
}: VariantProps<typeof ModalDividerVariants>) {
	return (
		<div className={cn(ModalDividerVariants({ weight }), "relative w-full")}>
			<div
				className={cn(
					ModalDividerVariants({ size, color, weight }),
					"absolute w-full",
				)}
			/>
		</div>
	)
}
export function NTModalFooter({ children }: PropsWithChildren) {
	return (
		<div className="order-last">
			<NTModalDivider size="big" weight="bold" color="dark" />
			<div className="flex h-[149px] items-center justify-center">
				{children}
			</div>
		</div>
	)
}

function XButton({ onClose }: Pick<NTModalPT, "onClose">) {
	return (
		<div className="absolute right-[28px] top-[20px] box-content">
			<NTIcon icon="delete" onClick={onClose} />
		</div>
	)
}
