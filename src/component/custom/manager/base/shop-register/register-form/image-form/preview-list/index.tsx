import Image from "next/image"
type PreviewList = {
	previewSrcArr: string[]
}
export default function PreviewList({ previewSrcArr }: PreviewList) {
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
					</div>
				)
			})}
		</>
	)
}
