"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import * as React from "react"
import { Toaster, toast } from "sonner"

import NTLogo from "@/../public/asset/nt-logo.svg"
import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTSearchfield from "@/component/common/nt-searchfield"
import NTToolbar from "@/component/common/nt-toolbar"
import { useAuth } from "@/config/auth-provider"
import { COMMON_HOME, COMMON_SIGN } from "@/constant/routing-path"
import { LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR } from "@/constant/toolbar-list"
import { postLogout } from "@/util/api/auth-controller"
import { deleteAllCookies } from "@/util/common/auth"

export default function CustomerHeader() {
	const { isAuthenticated } = useAuth()
	return (
		<div className="flex h-fit w-full flex-col gap-[16.5px] pt-[114.5px]">
			<div className="flex h-[51px] w-full items-center justify-between">
				<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
				<CustomerLayoutSearchfield />
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

function CustomerLayoutSearchfield() {
	const searchInputRef = useRef<HTMLInputElement>(null)
	return (
		<div className="mx-[70px] h-full w-[690px]">
			<NTSearchfield size="large" ref={searchInputRef} />
		</div>
	)
}
function CustomerLayoutSubCatalog() {
	const handleLogout = async () => {
		const response = await postLogout()
		if (response?.status === 200) {
			deleteAllCookies()
			toast.success("안녕히 가세요")
			setTimeout(() => {
				window.location.href = COMMON_HOME
			}, 1000)
		} else {
			toast.warning("로그아웃에 실패했습니다.")
		}
	}

	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<Toaster />
			<NTIcon className="text-Gray90" icon="bellLight" />
			<div className="h-[50px] w-[50px] rounded-full bg-Gray20" />
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
