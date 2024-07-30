import { QueryClient } from "@tanstack/react-query"
import { cache } from "react"

const getCacheClient = cache(() => new QueryClient())
export default getCacheClient
