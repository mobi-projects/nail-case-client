"use client"

import { handleLogout } from "@/util/common/auth"

export default function LogoutButton() {
	return <button onClick={handleLogout}>로그아웃</button>
}
