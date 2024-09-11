import Image from "next/image"

import NTLoginImage from "@/../public/asset/nt-login.svg"
import type { TSignType } from "@/type/union-option/sign-type"

type LoginWelcomeMessagePT = { loginType: TSignType }

export default function LoginWelcomeMessage({
	loginType,
}: LoginWelcomeMessagePT) {
	const WelcomeMessageMain = isCustomer(loginType)
		? "완벽한 손끝을 위한 당신의 새로운 예약 파트너"
		: "	 여러분의 샵을 NewTips에 등록하고 더 많은 고객을 만나세요"
	const WelcomeMessageSub = isCustomer(loginType)
		? "NewTips에서 네일 예약 경험을 시작하세요!"
		: " NewTips에서 당신의 네일 샵을 더 많은 고객에게 알리세요!"
	return (
		<div className="flex flex-col items-center">
			<Image src={NTLoginImage} alt="로그인 이미지" priority />
			<p className="pb-8 pt-4 text-center text-Title02 font-SemiBold text-Gray80">
				{WelcomeMessageMain}
			</p>
			<p className="pb-4 text-center text-Body02 text-[18px] font-Regular text-Gray70">
				{WelcomeMessageSub}
			</p>
		</div>
	)
}

export const isCustomer = (path: string) => {
	let isCustomer
	if (path === "manager") {
		isCustomer = false
	} else if (path === "member") {
		isCustomer = true
	}
	return isCustomer
}
