import CheckMessage from "@/component/custom/customer/sign/check-message/indext"
import InvalidAccess from "@/component/custom/customer/sign/invalid-access"
import LoginWelcomeMessage from "@/component/custom/customer/sign/login-welcome-message"
import SocialLoginButtons from "@/component/custom/customer/sign/social-login-buttons"
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
		<div className="flex h-dvh min-w-[360px] flex-col items-center justify-center max-sm:px-4">
			<div className="flex h-[70%] w-full flex-col items-center justify-start">
				<LoginWelcomeMessage loginType={loginType} />
				<SocialLoginButtons loginType={loginType} />
				<CheckMessage loginType={loginType} />
				<hr className="w-[80%] bg-Gray10 max-sm:w-full" />
			</div>
		</div>
	)
}
