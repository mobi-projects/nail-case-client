"use client"

import Image from "next/image"
import React from "react"

import type { ICON_DATA } from "@/component/common/nt-icon"
import NTIcon from "@/component/common/nt-icon"
import { useReservationArr } from "@/hook/use-common"
import { getAllDay } from "@/util/common/time"

import EnableIcon from "../../../../../../../../public/asset/enabled.png"

type ReservationCardPT = {
	icon?: keyof typeof ICON_DATA
}
const ReservationConfirmedCard: React.FC<ReservationCardPT> = ({ icon }) => {
	const { reservationArr } = useReservationArr(getAllDay())

	const filteredData =
		reservationArr?.filter((item) => item.status === "APPROVAL") || []

	return (
		<div className="relative flex h-[240px] w-[384px] items-center justify-between rounded-[26px] bg-Gray90 drop-shadow">
			<div className="flex h-[200px] flex-col justify-between px-[30px]">
				<div className="flex w-[330px] items-center justify-between">
					<div className="flex">
						{icon && (
							<NTIcon
								icon={icon}
								className="mr-[20px] h-[46px] w-[46px] text-white"
							/>
						)}
						<div>
							<div className="text-Title02 font-Bold text-White">예약확정</div>
							<div className="text-Body01 text-Gray50">모비네일 한남점</div>
						</div>
					</div>
					<Image
						src={EnableIcon}
						alt="Enable Icon"
						width={56}
						height={56}
						className="cursor-pointer"
					/>
				</div>
				<div className="text-LargeTitle font-Bold text-PB100">{`${filteredData.length}건`}</div>
			</div>
		</div>
	)
}

export default ReservationConfirmedCard
