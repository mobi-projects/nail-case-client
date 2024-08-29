import Image from "next/image"

import type { TMainPageShop } from "@/util/api-v2/get-main-page-data"

type NameNImagePT = {
	shop: TMainPageShop
}

export default function NameNImage({ shop }: NameNImagePT) {
	return (
		<div className="flex h-full w-fit flex-col items-center justify-center gap-y-3 py-2">
			<div className="w-48 max-w-48 truncate pl-4 text-Callout">
				{shop.name}
			</div>
			<div className="relative h-48 w-48 rounded-3xl">
				<Image
					src={shop.imageSrc}
					alt="네일샾 이미지"
					fill
					priority
					sizes="500px"
					className="rounded-3xl"
				/>
			</div>
		</div>
	)
}
