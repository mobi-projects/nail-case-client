"use client"

import Image from "next/image"

import { useGetUserInfo } from "@/hook/use-auth-controller"
import { isUndefined } from "@/util/common/type-guard"

export default function ProfileImage() {
	const { data: userInfo, isLoading } = useGetUserInfo()
	if (isUndefined(userInfo) || isLoading)
		return (
			<div className="h-16 w-16 transform animate-pulse rounded-full bg-Gray20" />
		)
	return (
		<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-Gray20">
			<Image
				src={userInfo.data.profileImage}
				alt="Profile"
				fill
				priority
				sizes="10vw"
				className="rounded-full"
			/>
		</div>
	)
}
