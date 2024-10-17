import type { TInfoImages } from "@/util/api/get-shop-info"

export const getEssestialImageProps = (imageArr: Array<TInfoImages>) => {
	return Array.from({ length: imageArr.length }, (_, idx) => ({
		alt: "bannerImage",
		src: imageArr[idx].imageUrl,
	}))
}
