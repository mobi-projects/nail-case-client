"use client"

import Image from "next/image"

import { useGetUserInfo } from "@/hook/use-auth-controller"

export default function ProfileImage() {
	const { data: userInfo } = useGetUserInfo()
	return (
		<Image
			src={userInfo?.data.profileImage as string}
			alt="Profile"
			width={50}
			height={50}
			className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-Gray20"
		/>
	)
}
