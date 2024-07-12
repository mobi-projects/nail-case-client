import Link from "next/link"

import { COMMON_SIGN } from "@/constant/routing-path"
import type { TSignType } from "@/type/union-option/sign-type"

import { isCustomer } from "../01"

type CheckMessaPT = { loginType: TSignType }

export default function CheckMessage({ loginType }: CheckMessaPT) {
	const anotherLoginPath = changePath(loginType)
	const AlertMessage = isCustomer(loginType)
		? "아티스트로 로그인하여 고객을 만나보려면"
		: " NewTips에서 네일 예약을 원하신다면 사용자 계정으로 로그인하세요!"

	return (
		<p className="group mb-2 text-center text-Body02 font-Regular text-Gray50">
			{AlertMessage}
			<Link href={`${COMMON_SIGN}/${anotherLoginPath}`}>
				<span className="px-1 font-SemiBold text-Gray80 group-hover:underline">
					여기
				</span>
			</Link>
			를 눌러주세요.
		</p>
	)
}

const changePath = (path: TSignType): string => {
	if (isCustomer(path)) return "manager"
	return "member"
}
