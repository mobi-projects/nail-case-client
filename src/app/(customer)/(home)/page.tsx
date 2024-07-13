"use client"
import { NTButton } from "@/component/common/atom/nt-button"
import CustomerHeader from "@/component/custom/customer/home/00"
import CardSlideListForm from "@/component/custom/customer/home/01"
import UsageForm from "@/component/custom/customer/home/02"
import ShopListForm from "@/component/custom/customer/home/03"
import { COMMON_HOME } from "@/constant/routing-path"
import { useGetMainPageDataQuery } from "@/hook/use-main-controller"
import type { TResGetMainPageHaveToken } from "@/type/main-page"

import { AroundShop, LikedShop } from "./mockData"

export default function CustomerHome() {
	const memberId = 2
	const { data: responseData, isError } = useGetMainPageDataQuery(memberId)
	if (isError) {
		return (
			<div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
				<h1 className="text-Title01 font-SemiBold text-PB100">
					죄송합니다. 접속 중 오류가 발생했습니다.
				</h1>
				<p className="text-Body01 text-Gray70">
					인터넷 연결 상태를 확인하시고 다시 시도해주세요.
				</p>
				<p className="text-Body01 text-Gray70">
					문제가 지속되면 고객 지원팀에 문의해주세요.
				</p>
				<NTButton
					variant={"primary"}
					size={"medium"}
					flexible={"fit"}
					onClick={() => (window.location.href = COMMON_HOME)}
				>
					홈으로
				</NTButton>
			</div>
		)
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
