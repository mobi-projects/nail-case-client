import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTToolbar from "@/component/common/nt-toolbar"
import { LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR } from "@/constant/toolbar-list"

import { LoginButtons } from "./login-buttons"
import { UserProfile } from "./user-profile"

type CustomerHeaderPT = {
	isLoggedIn: boolean
}

export default function CustomerHeader({ isLoggedIn }: CustomerHeaderPT) {
	return (
		<div className="flex h-fit w-full flex-col gap-[16.5px] pt-10">
			<div className="flex h-[51px] w-full items-center justify-between">
				<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
				{isLoggedIn ? <UserProfile /> : <LoginButtons />}
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
