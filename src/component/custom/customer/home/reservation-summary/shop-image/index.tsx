import Image from "next/image"

type ShopImagePT = {
	imageUrl: string
}
export default function ShopImage({ imageUrl }: ShopImagePT) {
	return (
		<div className="flex h-full w-fit items-center justify-center">
			<div className="relative h-40 w-40 rounded-full max-md:h-28 max-md:w-28">
				<Image
					src={imageUrl}
					alt="네일샾 이미지"
					fill
					priority
					sizes="500px"
					className="rounded-full"
				/>
			</div>
		</div>
	)
}
