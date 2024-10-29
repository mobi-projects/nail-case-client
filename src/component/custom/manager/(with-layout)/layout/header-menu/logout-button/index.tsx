"use client"

import { handleLogout } from "@/util/common/auth"

export default function LogoutButton() {
	return (
		<button onClick={handleLogout} className="text-Body01">
			로그아웃
		</button>
	)
}
