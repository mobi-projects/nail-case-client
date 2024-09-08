import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
type PreviewList = {
	previewSrcArr: string[]
	onClickDeleteIcon: (idx: number) => void
}
export default function PreviewList({
	previewSrcArr,
	onClickDeleteIcon,
}: PreviewList) {
	return (
		<>
			{previewSrcArr.map((previewSrc, idx) => {
				return (
					<div
						key={idx}
						className="relative flex aspect-square h-48 w-48 shrink-0 items-center justify-center rounded-[12px]"
					>
						<Image
							src={previewSrc}
							alt="preview"
							fill
							sizes="20vw"
							className="rounded-[12px]"
						/>
						<NTIcon
							icon="delete"
							onClick={() => onClickDeleteIcon(idx)}
							className="absolute right-0 top-0 z-10 h-4 w-4 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-White bg-Gray70 text-PY80 transition-all hover:border-transparent hover:bg-Gray80 hover:text-PY100"
						/>
					</div>
				)
			})}
		</>
	)
}
