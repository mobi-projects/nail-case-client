import LoginLogowithWelcomeMessage from "@/component/custom/customer/sign/01"
import SocialLoginButtons from "@/component/custom/customer/sign/02"
import CheckMessage from "@/component/custom/customer/sign/03/indext"
import InvalidAccess from "@/component/custom/customer/sign/04"
import type { TSignType } from "@/type/union-option/sign-type"
type SocialLoginButtonListPT = { params: { type: TSignType } }

export default function SocialLoginButtonList({
	params,
}: SocialLoginButtonListPT) {
	const loginType = params.type
	if (!(loginType === "manager" || loginType === "member")) {
		return <InvalidAccess />
	}
	return (
		<div className="flex h-dvh flex-col items-center justify-center">
			<div className="flex h-[70%] w-full flex-col items-center justify-start">
				<LoginLogowithWelcomeMessage loginType={loginType} />
				<SocialLoginButtons loginType={loginType} />
				<CheckMessage loginType={loginType} />
				<hr className="w-[70%] bg-Gray10" />
			</div>
		</div>
	)
}
