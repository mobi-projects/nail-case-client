import { QueryClient } from "@tanstack/react-query"

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
export default getQueryClient
