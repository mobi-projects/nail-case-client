import type { Metadata } from "next"

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

export default async function CustomerShop({ params }: CustomerShopPT) {
	const shopData = await getShopById(params.shopId)

	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData
	const metadata: Metadata = {
		title: `${shopName} - 상세 페이지`,
		description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
		openGraph: {
			title: shopName,
			description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
			images: profileImages[0].imageUrl,
		},
	}

	return (
		<>
			<meta name="description" content={metadata.description ?? ""} />
			<meta
				property="og:title"
				content={String(metadata.openGraph?.title ?? "")}
			/>
			<meta
				property="og:description"
				content={metadata.openGraph?.description}
			/>
			<meta
				property="og:image"
				content={String(metadata.openGraph?.images ?? "")}
			/>
			<div>
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
		</>
	)
}
