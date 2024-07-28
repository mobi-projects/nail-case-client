"use server"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import { ACCESS_TOKEN } from "@/constant/auth-key"

export const getServerCookie = () => {
	return getCookie(ACCESS_TOKEN, { cookies })
}
