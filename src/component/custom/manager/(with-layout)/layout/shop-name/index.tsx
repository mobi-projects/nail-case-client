"use client"

import { useGetUserInfo } from "@/hook/use-auth-controller"

export default function ShopName() {
	const { data: userInfo } = useGetUserInfo("MANAGER")

	const shopName = userInfo?.data.shopName
	return (
		<div className="flex h-[45px] w-[134px] items-center justify-center truncate bg-Gray10 text-Gray100">
			{shopName}
		</div>
	)
}
