"use client"
import CustomerHeader from "@/component/custom/customer/home/00"
import CardSlideListForm from "@/component/custom/customer/home/01"
import UsageForm from "@/component/custom/customer/home/02"
import ShopListForm from "@/component/custom/customer/home/03"
import { useGetMainPageDataQuery } from "@/hook/use-main-controller"
import type { TResGetMainPageHaveToken } from "@/type/mainPage"

import { AroundShop, LikedShop } from "./mockData"

export default function CustomerHome() {
	const memberId = 2
	const {
		data: responseData,
		isError,
		error,
	} = useGetMainPageDataQuery(memberId)
	if (isError) {
		return <div>Error: {error.message}</div>
	}
	const $reseponseData = (responseData?.data as TResGetMainPageHaveToken) || {}

	return (
		<div className="flex h-fit flex-col pb-[7px]">
			<CustomerHeader />
			<CardSlideListForm />
			<UsageForm />
			<hr className="w-full bg-Gray10" />
			<div className="flex h-fit w-full flex-col gap-[52px] pb-[33px] pt-[34px]">
				<ShopListForm
					listData={$reseponseData.topPopularShops}
					listMockData={AroundShop}
				/>
				<div
					className="absolute left-0 top-[166.5%] h-[12px] w-full border-y-[1px] bg-White"
					style={{ borderColor: "rgba(128, 214, 248, 0.4)" }}
				/>
				<ShopListForm
					listData={$reseponseData.topPopularShops}
					listMockData={LikedShop}
				/>
			</div>
		</div>
	)
}
