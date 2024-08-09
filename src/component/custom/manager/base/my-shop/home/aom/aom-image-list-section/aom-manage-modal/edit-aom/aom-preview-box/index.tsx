import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"

type AOMPreViewBoxPT = { imageUrl: string }
export function AOMPreViewBox({ imageUrl }: AOMPreViewBoxPT) {
	return (
		<div className="relative h-24 w-24 rounded-lg bg-White shadow-customGray80">
			<Image
				alt="미리보기"
				src={imageUrl}
				fill
				sizes="20vw"
				className="rounded-lg"
			/>
			<NTIcon
				icon="delete"
				className="absolute right-0 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-White bg-Gray70 text-PY80 transition-all hover:border-transparent hover:bg-Gray80 hover:text-PY100"
			/>
		</div>
	)
}
