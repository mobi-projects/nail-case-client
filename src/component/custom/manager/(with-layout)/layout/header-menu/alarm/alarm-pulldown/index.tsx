import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"

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
	const handleClickPulldownItem = ({ notificationId }: TResSubscribe) => {
		mutateAsync({ notificationId }).catch((error) =>
			console.error("Failed to mark notification as read:", error),
		)

		setMessage((prevMessage) => {
			const newMessage = prevMessage.filter(
				(reservation) => reservation.notificationId !== notificationId,
			)
			return newMessage
		})

		router.push(`${MANAGER_BASE}/${shopId}/reservations/PENDING/1`)
		setIsOpen(false)
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
				{message.map((reservation, idx) => {
					const content = reservation.content
					const firstThree = content.slice(0, 3) // 앞의 3글자
					const remaining = content.slice(3) // 나머지 글자

					return (
						<NTPulldownItem
							key={idx}
							className="w-full"
							onClick={() => handleClickPulldownItem(reservation)}
						>
							<div>
								<span>
									<span className="text-PB80">{firstThree}</span>
									<span className="text-Gray70">{remaining}</span>
								</span>
								<p className="w-full text-end text-Caption02 text-Gray50">
									({getTimeDifference(reservation.sendDateTime)})
								</p>
							</div>
						</NTPulldownItem>
					)
				})}
			</NTPulldownContent>
		</>
	)
}
