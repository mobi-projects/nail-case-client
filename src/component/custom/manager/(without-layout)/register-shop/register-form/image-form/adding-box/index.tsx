import type { ChangeEvent, HTMLAttributes } from "react"
import { forwardRef } from "react"

import NTIcon from "@/component/common/nt-icon"

type AddingBoxPT = HTMLAttributes<HTMLDivElement> & {
	onUploadFile: (e: ChangeEvent<HTMLInputElement>) => void
}
const AddingBox = forwardRef<HTMLInputElement, AddingBoxPT>(
	({ onClick, onUploadFile }, ref) => {
		return (
			<div
				className="flex aspect-square h-48 cursor-pointer flex-col items-center justify-center rounded-[12px] border border-Gray20 active:bg-Gray10"
				{...{ onClick }}
			>
				<NTIcon icon="camera" className="h-20 w-20 text-Gray40" />
				<p className="text-Callout text-[22px] text-Gray40">사진 등록</p>
				<input
					type="file"
					multiple
					accept="image/png,image/jpeg,image/jpg,image/webp"
					ref={ref}
					onChange={onUploadFile}
					className="hidden"
				/>
			</div>
		)
	},
)
AddingBox.displayName = "AddingBox"
export default AddingBox
