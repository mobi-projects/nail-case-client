"use client"
import NTIcon from "@/component/common/nt-icon"
import { handleLogout } from "@/util/common/auth"

import ProfileImage from "./profile-image"

export function UserProfile() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<NTIcon className="text-Gray90" icon="bellLight" />
			<ProfileImage />
			<button onClick={handleLogout}>로그아웃</button>
		</div>
	)
}
