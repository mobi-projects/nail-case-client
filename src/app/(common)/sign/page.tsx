import { CommonSignHeader } from "@/component/custom/common/sign/01"
import SocialLoginButtonList from "@/component/custom/common/sign/02"

export default function CommonSign() {
	return (
		<div className="grid h-dvh w-full grid-rows-[1fr_auto_2fr] justify-center gap-[40px]">
			<CommonSignHeader />
			<hr className="h-[2px] w-full border-Gray20" />
			<SocialLoginButtonList />
		</div>
	)
}
