import type { CookieValueTypes } from "cookies-next"
import { EventSourcePolyfill } from "event-source-polyfill"
import type { Dispatch, SetStateAction } from "react"
import { useEffect } from "react"

export const useSSE = (
	setMessage: Dispatch<SetStateAction<Array<TResSubscribe>>>,
	connect: boolean,
	token: CookieValueTypes,
) => {
	useEffect(() => {
		const sse = new EventSourcePolyfill(
			`${process.env.NEXT_PUBLIC_BACKEND_APP}/notification/subscribe`,
			{
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
				heartbeatTimeout: 86400000,
			},
		)
		sse.addEventListener("notify", (e) => {
			setMessage((prev) => {
				const newData = JSON.parse((e as MessageEvent).data)
				return [...prev, newData]
			})
		})

		sse.onerror = (error) => {
			console.error("SSE 연결에 문제가 발생했습니다:", error)
		}
		if (!connect) {
			sse.close()
		}
		return () => {
			sse.close()
		}
	}, [connect, token, setMessage])
}

export type TResSubscribe = {
	notificationId: number
	reservationId: number
	content: string
	notificationType: "RESERVATION_REQUEST"
	senderId: number
	receiverId: number
	sendDateTime: number
	startTime: number
	endTime: number | null
	read: boolean
}
