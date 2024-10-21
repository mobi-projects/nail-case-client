"use client"
import NTIcon from "@/component/common/nt-icon"
import { handleLogout } from "@/util/common/auth"

import ProfileImage from "./profile-image"

export function UserProfile() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] max-md:gap-2">
			<NTIcon
				className="text-Gray90 lg:h-8 lg:w-8 max-md:h-6 max-md:w-6"
				icon="bellLight"
			/>
			<ProfileImage />
			<button onClick={handleLogout} className="text-Body01">
				로그아웃
			</button>
		</div>
	)
}
