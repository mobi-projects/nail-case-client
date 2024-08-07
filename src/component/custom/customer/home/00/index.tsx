"use client"
import { getCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Toaster } from "sonner"

import NTLogo from "@/../public/asset/nt-logo.svg"
import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTToolbar from "@/component/common/nt-toolbar"
import { useAuth } from "@/config/auth-provider"
import { COMMON_SIGN } from "@/constant/routing-path"
import { LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR } from "@/constant/toolbar-list"
import { handleLogout } from "@/util/common/auth"

export default function CustomerHeader() {
	const { isAuthenticated } = useAuth()
	return (
		<div className="flex h-fit w-full flex-col gap-[16.5px] pt-[34.5px]">
			<div className="flex h-[51px] w-full items-center justify-between">
				<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
				{isAuthenticated ? <CustomerLayoutSubCatalog /> : <LoginButtons />}
			</div>
			<div className="mb-[23px] flex w-full flex-col">
				<hr className="absolute left-0 z-[-10] w-full border border-Gray10" />
				<NTToolbar
					toolList={[...LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR]}
					position="top"
				/>
			</div>
		</div>
	)
}

function CustomerLayoutSubCatalog() {
	const profileUrl = getCookie("profile-image") || ""

	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<Toaster />
			<NTIcon className="text-Gray90" icon="bellLight" />
			<Image
				src={decodeURIComponent(profileUrl)}
				alt="Profile"
				width={50}
				height={50}
				className="h-[50px] w-[50px] rounded-full bg-Gray20"
			/>
			<button onClick={handleLogout}>로그아웃</button>
		</div>
	)
}

function LoginButtons() {
	const router = useRouter()
	return (
		<div className="flex items-center justify-center gap-x-7">
			<button
				onClick={() => {
					router.push(`${COMMON_SIGN}/member`)
				}}
			>
				로그인
			</button>
			<NTButton
				variant={"primary"}
				size={"small"}
				flexible={"fit"}
				onClick={() => {
					router.push(`${COMMON_SIGN}/manager`)
				}}
			>
				shop 관리
			</NTButton>
		</div>
	)
}
