import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import {
	NTPulldownContent,
	NTPulldownItem,
	NTPulldownLabel,
	NTPulldownTrigger,
	useNTPulldown,
} from "@/component/common/nt-pulldown"
import { MANAGER_BASE } from "@/constant/routing-path"
import type { TResSubscribe } from "@/hook/use-sse"
import { useMutateReadNotification } from "@/util/api-v2/post-read-notification"

import { getTimeDifference } from "./alarm-pulldown.util"

type AlarmPulldownPT = {
	message: Array<TResSubscribe>
	setMessage: Dispatch<SetStateAction<Array<TResSubscribe>>>
}
export default function AlarmPulldown({
	message,
	setMessage,
}: AlarmPulldownPT) {
	const { setIsOpen } = useNTPulldown()
	const router = useRouter()
	const { mutateAsync } = useMutateReadNotification()
	const shopId = getCookie("shopId")

	const readNewAlarm = (notificationId: number) => {
		mutateAsync({ notificationId }).catch((error) =>
			console.error("Failed to mark notification as read:", error),
		)

		setMessage((prevMessage) => {
			const newMessage = prevMessage.filter(
				(reservation) => reservation.notificationId !== notificationId,
			)
			return newMessage
		})
	}

	const handleClickPulldownItem = ({ notificationId }: TResSubscribe) => {
		readNewAlarm(notificationId)
		router.push(`${MANAGER_BASE}/${shopId}/reservations/PENDING/1`)
		setIsOpen(false)
	}
	const handleClickDeleteIcon = ({ notificationId }: TResSubscribe) => {
		readNewAlarm(notificationId)
	}
	return (
		<>
			<NTPulldownTrigger
				hasArrow={false}
				className="absolute -right-2 -top-1 h-fit w-fit border-none bg-transparent"
			>
				<div className="h-2 w-2 animate-pulse rounded-full bg-PB110 transition-all duration-300" />
			</NTPulldownTrigger>
			<NTPulldownContent
				position="centerBottom"
				className="max-h-[300px] w-[260px]"
			>
				<NTPulldownLabel className="h-fit">
					<div
						className="flex h-full w-full cursor-pointer justify-end text-Callout text-Gray60 hover:underline"
						onClick={() => {
							router.push(`${MANAGER_BASE}/notifications`)
							setIsOpen(false)
						}}
					>
						전체보기
					</div>
				</NTPulldownLabel>
				{message.map((reservation, idx) => (
					<NTPulldownItem
						key={idx}
						className="relative w-full"
						onClick={() => handleClickPulldownItem(reservation)}
					>
						<div>
							<p>
								<span className="text-PB80">{reservation.nickname}</span>
								<span className="text-Gray70">{reservation.content}</span>
							</p>
							<p className="w-full text-end text-Caption02 text-Gray50">
								({getTimeDifference(reservation.sendDateTime)})
							</p>
							<div className="absolute -top-1 right-1 z-30">
								<NTIcon
									icon="delete"
									className="h-3 w-3 rounded-full bg-Gray70 text-PY80 transition-all hover:scale-105 hover:border-transparent hover:bg-Gray80 hover:text-PY100"
									onPointerDown={(e) => {
										e.preventDefault()
										e.stopPropagation()
										handleClickDeleteIcon(reservation)
									}}
								/>
							</div>
						</div>
					</NTPulldownItem>
				))}
			</NTPulldownContent>
		</>
	)
}
