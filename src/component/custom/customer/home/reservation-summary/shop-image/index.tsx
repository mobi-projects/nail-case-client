import Image from "next/image"

type ShopImagePT = {
	imageUrl: string
}
export default function ShopImage({ imageUrl }: ShopImagePT) {
	return (
		<div className="relative h-40 w-40 rounded-full">
			<Image
				src={imageUrl}
				alt="네일샾 이미지"
				fill
				priority
				sizes="500px"
				className="rounded-full"
			/>
		</div>
	)
}
