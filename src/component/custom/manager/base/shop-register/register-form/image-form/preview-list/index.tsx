import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
type PreviewList = {
	previewSrcArr: string[]
	onUnloadFile: (idx: number) => void
}
export default function PreviewList({
	previewSrcArr,
	onUnloadFile,
}: PreviewList) {
	return (
		<>
			{previewSrcArr.map((previewSrc, idx) => {
				return (
					<div
						key={idx}
						className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-Gray20"
					>
						<Image
							src={previewSrc}
							alt="preview"
							fill
							className="object-cover"
						/>
						<NTIcon
							icon="delete"
							className="absolute right-2 top-2 h-[20px] w-[20px] rounded-full bg-[#FF2C45] text-White active:bg-[#8d0010]"
							onClick={() => onUnloadFile(idx)}
						/>
					</div>
				)
			})}
		</>
	)
}
