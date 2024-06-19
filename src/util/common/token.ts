import { ACCESS_TOKEN } from "@/constant"

export const getAccessTokenAtClient = () => localStorage.getItem(ACCESS_TOKEN)
