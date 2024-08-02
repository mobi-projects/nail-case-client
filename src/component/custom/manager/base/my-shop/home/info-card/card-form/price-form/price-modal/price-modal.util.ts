import type { TInfoImages } from "@/util/api_v2/get-shop-info"

/** api 를 통해서 받는 데이터를 image를 사용하는 형태로 객체화 **/
export const getPriceImageProps = (imageArr: Array<TInfoImages>) => {
	return Array.from({ length: imageArr.length }, (_, idx) => ({
		alt: "priceImage",
		src: imageArr[idx].imageUrl,
	}))
}
