import Image from "next/image"

type ReservationImageListPT = {
	imageList: Array<string>
}
export function ReservationImageList({ imageList }: ReservationImageListPT) {
	const [firstImage, ...otherImages] = imageList
	const sliceImageList = otherImages.slice(0, 4)
	return (
		<div className="flex flex-col gap-[9px]">
			<div className="relative h-[174px] w-[173px] rounded-[7px]">
				{firstImage ? (
					<Image
						className="rounded-[7px]"
						src={firstImage}
						alt={firstImage}
						fill
						priority
						sizes="40px"
					/>
				) : (
					<div className="h-full w-full pt-[50px] text-center text-Body02 font-SemiBold">
						예약 사진이 없습니다
					</div>
				)}
			</div>

			<div className="flex gap-[4px]">
				{sliceImageList.map((image, idx) => (
					<div className="relative h-[40px] w-[40px] rounded-[4px]" key={idx}>
						<Image
							className="rounded-[4px]"
							src={image}
							alt={image}
							fill
							priority
							sizes="40px"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
