"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { PropsWithChildren } from "react"

export default function TanstackQueryProvider({ children }: PropsWithChildren) {
	const queryClient = getQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
let browserQueryClient: QueryClient | undefined = undefined
const createNewQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: true,
				refetchOnMount: true,
				staleTime: 60 * 1000,
			},
		},
	})
}
const getQueryClient = () => {
	if (typeof window === "undefined") return createNewQueryClient()
	else {
		if (!browserQueryClient) browserQueryClient = createNewQueryClient()
		return browserQueryClient
	}
}
