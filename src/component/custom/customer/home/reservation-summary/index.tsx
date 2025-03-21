"use client"

import { useQuery } from "@tanstack/react-query"

import DefaultShopImage from "@/../public/asset/default-shop-image.jpg"
import NTContent from "@/component/common/nt-content"
import { QUERY_MAINPAGE_QUERY } from "@/constant"
import { getMainPageData } from "@/util/api/get-main-page-data"
import { isNull, isUndefined } from "@/util/common/type-guard"

import ReservationSummaryError from "./reservation-summary-error"
import ReservationSummarySkeleton from "./reservation-summary-skeleton"
import { getReservationStatus } from "./reservation-summary.util"
import ReservationInfo from "./rservation-info"
import ShopImage from "./shop-image"
export default function ReservationSummary() {
	const { data, isLoading, isError } = useQuery({
		queryKey: [QUERY_MAINPAGE_QUERY],
		queryFn: getMainPageData,
	})

	if (isLoading) return <ReservationSummarySkeleton />
	if (isError || isUndefined(data)) return <ReservationSummaryError />
	if (isNull(data)) return
	const { details, shop } = data
	if (isUndefined(details)) return

	const reservationStatus = getReservationStatus(details)
	return (
		<div className="relative my-10 h-[18rem] w-2/3 rounded-3xl bg-White px-8 py-4 shadow-customGray80 max-lg:h-fit max-lg:w-full">
			<div className="py-3 text-Title03 font-SemiBold text-PB100 max-md:text-[16px]">
				진행 중인 네일
			</div>
			<div className="grid grid-cols-[12rem_1fr] max-md:grid-cols-[8rem_1fr]">
				<ShopImage
					imageUrl={shop.shopImageUrl ? shop.shopImageUrl : DefaultShopImage}
				/>
				<ReservationInfo reservation={data} />
				<NTContent mode="day" className="absolute right-5 top-3 px-[15.5px]">
					{reservationStatus}
				</NTContent>
			</div>
		</div>
	)
}
