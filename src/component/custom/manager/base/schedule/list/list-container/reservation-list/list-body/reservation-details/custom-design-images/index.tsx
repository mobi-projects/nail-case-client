import Image from "next/image"

import type { TTreatmentImage } from "@/util/api-v2/list-reservation"

type CustomDesignImagePT = {
	treatmentImages: TTreatmentImage[]
}
export const CustomDesignImages = ({
	treatmentImages,
}: CustomDesignImagePT) => {
	return (
		<div className="flex h-[90px] w-full items-start gap-[10px] pl-[80px]">
			{treatmentImages.map(({ imageId, imageUrl }) => (
				<Image
					src={imageUrl}
					key={imageId}
					alt="customers request image"
					width={80}
					height={80}
					className="aspect-square rounded-[8px] object-cover"
				/>
			))}
		</div>
	)
}
