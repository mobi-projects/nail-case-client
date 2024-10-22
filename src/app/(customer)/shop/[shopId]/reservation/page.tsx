import Reservation from "@/component/custom/customer/shop/reservation"
import Header from "@/component/custom/customer/shop/reservation/header"
import { getShopById } from "@/util/api/get-shop-by-id"

type CustomerShopPT = {
	params: {
		shopId: string
	}
}
const serverFetchShopById = async (shopId: number) => {
	let shopName: string
	let address: string
	const category: string = "네일아트 전문"
	try {
		const response = await getShopById(shopId)
		shopName = response.shopName
		address = response.address
	} catch {
		shopName = "매장이름을 찾지 못했습니다."
		address = "매장 주소를 찾지 못했습니다."
	}
	return { shopName, address, category }
}

export default async function CustomerShopReservation({
	params,
}: CustomerShopPT) {
	const shopId = parseInt(params.shopId)
	const { shopName, address, category } = await serverFetchShopById(shopId)
	return (
		<main className="flex h-fit w-full max-w-[1200px] flex-col justify-center py-10 lg:px-5 xl:px-10 max-md:px-2">
			<Header {...{ shopId, shopName, address, category }} />
			<hr className="mt-8 h-[1.5px] w-full border-Gray20 max-md:mt-4" />
			<Reservation shopId={shopId} />
		</main>
	)
}
