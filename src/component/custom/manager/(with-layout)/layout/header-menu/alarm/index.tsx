"use client"

import { getCookie } from "cookies-next"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { useNTPulldown } from "@/component/common/nt-pulldown"
import { cn } from "@/config/tailwind"
import { ACCESS_TOKEN } from "@/constant/auth-key"
import { useSSE, type TResSubscribe } from "@/hook/use-sse"

import AlarmPulldown from "./alarm-pulldown"

dayjs.extend(relativeTime)

export default function Alarm() {
	const [message, setMessage] = useState<Array<TResSubscribe>>([])
	const [connect, setConnect] = useState(false) // SSE연결을 제어하기위한 임시상태 추후 제거예정

	const { setIsOpen } = useNTPulldown()
	const accessToken = getCookie(ACCESS_TOKEN)
	const hasNewReservation = message.length > 0
	useSSE(setMessage, connect, accessToken)

	return (
		<div className="relative flex h-fit w-fit items-center">
			<button
				onClick={() => {
					setConnect((prev) => !prev)
					if (connect) {
						setMessage([])
					}
				}}
				className="text-center text-Callout"
			>
				연결
			</button>
			<NTIcon
				className={cn(
					"text-Gray90 lg:h-8 lg:w-8 max-md:h-6 max-md:w-6",
					hasNewReservation && "cursor-pointer",
				)}
				icon="bellLight"
				onClick={() => {
					if (hasNewReservation) {
						setIsOpen((prev) => !prev)
					}
				}}
			/>
			{hasNewReservation && (
				<AlarmPulldown message={message} setMessage={setMessage} />
			)}
		</div>
	)
}
