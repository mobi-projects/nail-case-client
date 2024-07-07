import AccountDetectionNotice from "@/component/custom/common/sign/role/01"
import RoutingCardList from "@/component/custom/common/sign/role/02"

export default function CommonSignRole() {
	const tmpEmail = "your@email.tmp"
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-[80px]">
			<AccountDetectionNotice email={tmpEmail} />
			<p className="text-Body02 font-SemiBold text-Gray80">
				어떤 계정으로 로그인하시겠습니까?
			</p>
			<RoutingCardList />
		</div>
	)
}
