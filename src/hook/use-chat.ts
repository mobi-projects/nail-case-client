import { Client } from "@stomp/stompjs"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { useEffect, useMemo, useRef, useState } from "react"
import SockJS from "sockjs-client"

import { QUERY_CHAT_ROOM_LIST, QUERY_PREV_CHAT } from "@/constant"
import { ACCESS_TOKEN } from "@/constant/auth-key"
import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { getPrevChat, type ReqGetPrevChat } from "@/util/api/get-prev-chat"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"
import { getRoomList } from "@/util/api/get-room-list"
import { isNull } from "@/util/common/type-guard"

export const useGetRoomList = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_CHAT_ROOM_LIST, shopId],
		queryFn: () => getRoomList(shopId),
		staleTime: 0,
		gcTime: 0,
	})

export const useChatMessage = (
	chatRoomInfo: ResCreateRoom,
	isOpen: boolean,
) => {
	// 전체 채팅 message Arr state
	const [messageArr, setMessageArr] = useState<Array<TChatMessage>>([])
	const messageEndRef = useRef<HTMLDivElement>(null)
	const stompClient = useMemo(() => {
		const socketUrl = `http://15.165.15.0/api/v1/chat/inbox`
		const token = getCookie(ACCESS_TOKEN)
		return new Client({
			webSocketFactory: () => new SockJS(socketUrl),

			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
			onConnect: () => {
				stompClient.subscribe(
					`/exchange/chat.exchange/chat.${chatRoomInfo.chatRoomId}`,
					(message) => {
						const response = message.body

						const newMessage: ResMessage = JSON.parse(response)
						console.log(newMessage)
						if (newMessage.sentByShop) {
							setMessageArr((prevArr) => [
								...prevArr,
								{
									message: newMessage.message,
									sentByShop: newMessage.sentByShop,
									timeStamp: newMessage.createdAt,
								},
							])
						}
					},
					{ Authorization: `Bearer ${token}` },
				)
			},

			onStompError: (frame) => {
				console.error("STOMP error:", frame)
			},
		})
	}, [chatRoomInfo])

	useEffect(() => {
		if (!isNull(messageEndRef.current)) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messageArr])

	useEffect(() => {
		if (!isNull(messageEndRef.current) && isOpen) {
			messageEndRef.current.scrollIntoView({ behavior: "instant" })
		}
	}, [isOpen])

	return { messageArr, setMessageArr, stompClient, messageEndRef }
}

export const useManagerChatMessage = (chatRoomInfo: ResGetRoomInfo) => {
	// 전체 채팅 message Arr state
	const [messageArr, setMessageArr] = useState<Array<TChatMessage>>([])
	const messageEndRef = useRef<HTMLDivElement>(null)
	const stompClient = useMemo(() => {
		const socketUrl = `http://15.165.15.0/api/v1/chat/inbox`
		const token = getCookie(ACCESS_TOKEN)
		return new Client({
			webSocketFactory: () => new SockJS(socketUrl),

			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
			onConnect: () => {
				stompClient.subscribe(
					`/exchange/chat.exchange/chat.${chatRoomInfo.chatRoomId}`,
					(message) => {
						const response = message.body

						const newMessage: ResMessage = JSON.parse(response)
						if (!newMessage.sentByShop) {
							setMessageArr((prevArr) => [
								...prevArr,
								{
									message: newMessage.message,
									sentByShop: newMessage.sentByShop,
									timeStamp: newMessage.createdAt,
								},
							])
						}
					},
					{ Authorization: `Bearer ${token}` },
				)
			},

			onStompError: (frame) => {
				console.error("STOMP error:", frame)
			},
		})
	}, [chatRoomInfo])
	useEffect(() => {
		stompClient.activate()

		return () => {
			stompClient.deactivate() // 컴포넌트 언마운트 시 연결 해제
		}
	}, [stompClient])

	useEffect(() => {
		if (!isNull(messageEndRef.current)) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messageArr])

	return { messageArr, setMessageArr, stompClient, messageEndRef }
}

export type TChatMessage = {
	message: string
	timeStamp: number
	sentByShop: boolean
}

export type ResMessage = {
	chatMessageId: number
	chatRoomId: number
	memberId: number
	shopId: number
	message: string
	readByMember: boolean
	readByShop: boolean
	sentByShop: boolean
	createdAt: number
	writerNickname: string
}

export const usePrevChat = ({ roomId, page, size }: ReqGetPrevChat) =>
	useQuery({
		queryKey: [QUERY_PREV_CHAT, roomId],
		queryFn: () => getPrevChat({ roomId, page, size }),
	})

export const useChatInfiniteScroll = ({ roomId, size }: ReqGetPrevChat) => {
	const {
		data,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isError,
		isFetchingNextPage,
		isFetched,
	} = useInfiniteQuery({
		queryKey: ["chat-infinite-scroll", roomId],
		queryFn: async ({ pageParam }) => {
			const response = await getPrevChat({ roomId, page: pageParam, size })
			return response
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.pageNumber + 1
			return nextPage < lastPage.totalPages ? nextPage : undefined
		},
	})

	const spinnerRef = useRef(null)

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px 0px 0px 0px",
			threshold: 1,
		}
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		}, options)

		const currentRef = spinnerRef.current
		if (currentRef) {
			io.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				io.unobserve(currentRef)
			}
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	return {
		data,
		isLoading,
		hasNextPage,
		spinnerRef,
		isError,
		isFetchingNextPage,
		isFetched,
	}
}
