import type { TInfoImages } from "@/util/api_v2/get-shop-Info"

export const getPriceImageProps = (imageArr: Array<TInfoImages>) => {
	return Array.from({ length: imageArr.length }, (_, idx) => ({
		alt: "priceImage",
		src: imageArr[idx].imageUrl,
	}))
}
