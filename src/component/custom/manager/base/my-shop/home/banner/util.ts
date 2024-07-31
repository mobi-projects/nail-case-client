import type { TInfoImages } from "@/util/api_v2/get-shop-Info"

export const getEssestialImageProps = (imageArr: Array<TInfoImages>) => {
	return Array.from({ length: imageArr.length }, (_, idx) => ({
		alt: "bannerImage",
		src: imageArr[idx].imageUrl,
	}))
}
