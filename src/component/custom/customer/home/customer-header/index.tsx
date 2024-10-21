import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTToolbar from "@/component/common/nt-toolbar"
import { REFRESH_TOKEN } from "@/constant/auth-key"
import { LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR } from "@/constant/toolbar-list"

import { LoginButtons } from "./login-buttons"
import { UserProfile } from "./user-profile"

export default function CustomerHeader() {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN, { cookies }) // CustomerHome은 server 컴포넌트이기 때문에 serverCookie로 설정했습니다.
	return (
		<div className="flex h-fit w-full flex-col gap-[16.5px] pt-8 lg:pt-4 max-md:pt-5">
			<div className="flex h-[51px] w-full items-center justify-between max-md:h-[20px]">
				<Link href={`/`}>
					<Image
						src={NTLogo}
						alt="brand-logo"
						width={134}
						height={38}
						priority
						className="cursor-pointer lg:h-7 lg:w-24 max-md:h-6 max-md:w-20"
					/>
				</Link>
				{isLoggedIn ? <UserProfile /> : <LoginButtons />}
			</div>
			<div className="mb-6 flex w-full flex-col max-md:mb-5">
				<hr className="absolute left-0 z-[-10] w-full border border-Gray10" />
				<NTToolbar
					toolList={[...LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR]}
					position="top"
				/>
			</div>
		</div>
	)
}
