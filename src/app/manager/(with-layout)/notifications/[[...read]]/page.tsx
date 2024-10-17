"use client"
import { useRouter } from "next/navigation"

import { NTStyledButton } from "@/component/common/nt-styled-button"
import { cn } from "@/config/tailwind"
import { MANAGER_BASE } from "@/constant/routing-path"
import { useGetNotifications } from "@/hook/use-notifications"
import type { TResSubscribe } from "@/hook/use-sse"
import { decomposeStamp } from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type NotificationsPT = { params: { read: undefined | Array<"not-read"> } }

export default function Notifications({ params }: NotificationsPT) {
	const isFiltered = !isUndefined(params.read)
	const router = useRouter()
	const handleClickAllBtn = () => {
		if (isFiltered) {
			router.push(`${MANAGER_BASE}/notifications`)
		}
	}
	const handleClickAllNotReadBtn = () => {
		if (!isFiltered) {
			router.push(`${MANAGER_BASE}/notifications/not-read`)
		}
	}
	const { data, isLoading } = useGetNotifications()
	if (isLoading || isUndefined(data)) return
	const notReadList = data?.filter((reseravtion) => !reseravtion.read)
	const list = isFiltered ? notReadList : data

	return (
		<div className="flex h-full w-full justify-center">
			<div className="h-fit w-[75%]">
				<div className="flex gap-6 py-8">
					<NTStyledButton
						size={"exSmall"}
						variant={isFiltered ? "secondary" : "primary"}
						onClick={handleClickAllBtn}
					>
						전체
					</NTStyledButton>
					<NTStyledButton
						size={"exSmall"}
						variant={!isFiltered ? "secondary" : "primary"}
						onClick={handleClickAllNotReadBtn}
					>
						읽지 않음
					</NTStyledButton>
				</div>
				<div className="flex flex-col gap-y-5 rounded-md bg-Gray10/40">
					{list?.length > 0 &&
						list.map((item, idx) => <NotificationItem {...item} key={idx} />)}
				</div>
			</div>
		</div>
	)
}

type NotificationItemPT = TResSubscribe
function NotificationItem({
	content,
	read,
	reservationId,
	sendDateTime,
	startTime,
}: NotificationItemPT) {
	return (
		<div className="group flex cursor-pointer items-center gap-x-3 rounded-md py-2">
			<p className="text-Callout font-SemiBold text-Gray60">{`#  ${reservationId}`}</p>
			<p
				className={cn(
					"text-Body01 font-Bold",
					read ? "text-Gray40" : "text-Gray80",
				)}
			>
				{content}
			</p>

			<p
				className={cn(
					"text-Body01 font-Bold",
					read ? "text-Gray40" : "text-Gray80",
				)}
			>
				(희망 시술 시간 : {getReservationReqTime(startTime)})
			</p>
			<p className="text-Caption01 text-Gray40">
				{getReservationReqTime(sendDateTime)}
			</p>
		</div>
	)
}

const getReservationReqTime = (timeStamp: number) => {
	const { date, month, hour } = decomposeStamp(timeStamp)

	return `${month}월 ${date}일 ${hour}시`
}
