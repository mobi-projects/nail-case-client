import CustomerShopBanner from "@/component/custom/customer/shop/banner"
import CustomerShopContent from "@/component/custom/customer/shop/shop-content"
import ShopError from "@/component/custom/customer/shop/shop-error"
import { getShopById } from "@/util/api-v2/get-shop-by-id"
import { convertStringToInteger } from "@/util/common"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
const serverFetchShopById = async (shopId: number) => {
	let shopData
	try {
		const response = await getShopById(shopId)
		shopData = response
	} catch {
		shopData = null
	}
	return shopData
}
export default async function CustomerShop({ params }: CustomerShopPT) {
	const { shopId } = params
	const shopData = await serverFetchShopById(shopId)

	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData
	return (
		<div className="h-full w-full">
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
				shopId={convertStringToInteger(params.shopId)}
			/>
			<CustomerShopContent
				shopId={convertStringToInteger(params.shopId)}
				data={shopData}
			/>
		</div>
	)
}
