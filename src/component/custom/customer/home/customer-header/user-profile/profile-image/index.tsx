import Image from "next/image"

import { useGetUserInfo } from "@/hook/use-auth-controller"
import { isUndefined } from "@/util/common/type-guard"

export default function ProfileImage() {
	const { data: userInfo, isLoading } = useGetUserInfo("MEMBER")
	if (isUndefined(userInfo) || isLoading)
		return (
			<div className="h-16 w-16 transform animate-pulse rounded-full bg-Gray20 lg:h-12 lg:w-12 max-md:h-10 max-md:w-10" />
		)
	return (
		<Image
			src={userInfo.data.profileImage}
			alt="Profile"
			width={64}
			height={64}
			className="rounded-full bg-Gray20 lg:h-12 lg:w-12 max-md:h-10 max-md:w-10"
		/>
	)
}
