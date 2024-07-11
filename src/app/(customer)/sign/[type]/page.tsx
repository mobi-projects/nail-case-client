"use client"

import type { HTMLAttributes, PropsWithChildren } from "react"

import { cn } from "@/config/tailwind"
import type { TSignType } from "@/type/union-option/sign-type"

type SocialLoginButtonList = { loginType: TSignType }
export default function SocialLoginButtonList({
	loginType,
}: SocialLoginButtonList) {
	return (
		<div className="flex h-fit flex-col items-center justify-center gap-[15px]">
			<KakaoLoginButton loginType={loginType} />
			<SocialLoginButton
				isDisabled={true}
				className="bg-gradient-to-tr from-[#FFD96B] via-[#FF2395] to-[#AD23F1] text-[#FFFFFF]"
			>
				인스타그램 로그인
			</SocialLoginButton>
			<SocialLoginButton
				isDisabled={true}
				className="bg-[#3C599B] text-[#FFFFFF]"
			>
				페이스북 로그인
			</SocialLoginButton>
		</div>
	)
}

type SocialButtonPT = HTMLAttributes<HTMLButtonElement> &
	PropsWithChildren & {
		isDisabled?: boolean
	}
function SocialLoginButton({
	isDisabled,
	children,
	className,
}: SocialButtonPT) {
	return (
		<button
			className={cn(
				"flex h-[45px] w-[263px] items-center justify-center text-nowrap rounded-[12px] p-[2px] text-center text-Title03 font-SemiBold text-White shadow-customGray80 disabled:bg-Gray40 disabled:text-Gray20",
				!isDisabled &&
					"transition-all duration-100 hover:scale-95 hover:shadow-customGray60",
				!isDisabled && className,
			)}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
}
type KakaoLoginButtonPT = { loginType: TSignType }

function KakaoLoginButton({ loginType }: KakaoLoginButtonPT) {
	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY_KAKAO}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRET_URI_KAKAO}&response_type=code&prompt=select_account&state=${loginType}`
	const handleLogin = () => {
		window.location.href = kakaoURL
	}
	return (
		<button
			className="flex h-fit w-fit items-center justify-center"
			onClick={handleLogin}
		>
			<p>카카오 로그인</p>
		</button>
	)
}
