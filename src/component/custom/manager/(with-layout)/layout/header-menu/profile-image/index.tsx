"use client"

import Image from "next/image"

import { useGetUserInfo } from "@/hook/use-auth-controller"
import { isUndefined } from "@/util/common/type-guard"

export default function ProfileImage() {
	const { data: userInfo, isLoading } = useGetUserInfo("MANAGER")
	if (isUndefined(userInfo) || isLoading)
		return (
			<div className="relative aspect-square w-16 animate-pulse rounded-full bg-Gray20 lg:w-12 max-md:w-10" />
		)

	return (
		<div className="relative aspect-square w-16 overflow-hidden rounded-full bg-Gray20 lg:w-12 max-md:w-10">
			<Image
				src={userInfo.data.profileImage}
				alt="Profile"
				fill
				priority
				sizes="(max-width: 768px) 40px, (max-width: 1024px) 48px, 64px"
				className="rounded-full object-cover"
			/>
		</div>
	)
}
