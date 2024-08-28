import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

import { getTopPopularShops } from "@/util/api-v2/get-top-popular-shops"

export const useInfiniteScroll = (size: number = 6) => {
	const { data, isLoading, fetchNextPage, hasNextPage, isError } =
		useInfiniteQuery({
			queryKey: ["infinite-query"],
			queryFn: async ({ pageParam }) => {
				const response = await getTopPopularShops(pageParam, size)
				return response.data
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
			rootMargin: "0px 0px 15px 0px",
			threshold: 0.3,
		}
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasNextPage) {
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
	}, [fetchNextPage, hasNextPage])

	return { data, isLoading, hasNextPage, spinnerRef, isError }
}
