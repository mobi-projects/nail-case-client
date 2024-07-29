import type { ChangeEvent, HTMLAttributes } from "react"
import { forwardRef } from "react"

type AddingBoxPT = HTMLAttributes<HTMLDivElement> & {
	onUploadFile: (e: ChangeEvent<HTMLInputElement>) => void
}
const AddingBox = forwardRef<HTMLInputElement, AddingBoxPT>(
	({ onClick, onUploadFile }, ref) => {
		return (
			<div
				className="flex aspect-square h-full cursor-pointer flex-col items-center justify-center rounded-[12px] border border-Gray20 active:bg-Gray10"
				{...{ onClick }}
			>
				<p className="text-center text-Headline01 font-Light text-Gray30">+</p>
				<input
					type="file"
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
