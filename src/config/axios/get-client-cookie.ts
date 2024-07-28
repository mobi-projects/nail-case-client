import { getCookie } from "cookies-next"

import { ACCESS_TOKEN } from "@/constant/auth-key"

export const getClientCookie = () => {
	return getCookie(ACCESS_TOKEN)
}
