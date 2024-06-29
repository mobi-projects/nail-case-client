import type { PropsWithChildren } from "react"
import { forwardRef } from "react"

import { cn } from "@/config/tailwind"

import { useSheet } from "./nt-sheet.context"

type NTSheetPT = PropsWithChildren<{ className?: string }>

const NTSheet = forwardRef<HTMLDialogElement, NTSheetPT>(
	({ children, className, ...rest }, ref) => {
		const { onCloseSheet } = useSheet()
		return (
			<dialog
				ref={ref}
				className={cn(
					"mb-0 h-full w-full bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-md",
					className,
				)}
				onClick={() => onCloseSheet()}
				{...rest}
			>
				<SheetBody>{children}</SheetBody>
			</dialog>
		)
	},
)
NTSheet.displayName = "NTSheet"
export default NTSheet

function SheetBody({ children }: PropsWithChildren) {
	return (
		<div
			className="fixed bottom-0 left-0 right-0 h-[80%] w-full rounded-t-[26px] bg-gradient-to-t from-[#AFBFC6] to-[#EFFAFF] p-[50px]"
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			{children}
		</div>
	)
}
