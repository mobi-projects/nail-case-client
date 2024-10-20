"use client"
import Image from "next/image"

import KakaoSymbol from "@/../public/asset/kakao-symbol.svg"
import type { TSignType } from "@/type/union-option/sign-type"

type SocialLoginButtonsPT = { loginType: TSignType }

export default function SocialLoginButtons({
	loginType,
}: SocialLoginButtonsPT) {
	return (
		<div className="flex h-[20rem] w-[20rem] flex-col items-center justify-start gap-4 rounded-md pt-10">
			<p className="text-center text-Body02 font-Regular text-Gray60">
				SNS 계정으로 간편 로그인
			</p>
			<KakaoLoginButton loginType={loginType} />
		</div>
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
			className="flex h-[50px] w-full min-w-[10rem] items-center justify-center gap-2 rounded-[12px] bg-[#FEE500]"
			onClick={handleLogin}
		>
			<Image
				src={KakaoSymbol}
				alt="Symbol"
				width={20}
				height={20}
				className="h-5 w-5"
			/>
			<p className="text-Black max-sm:text-[14px]">카카오 로그인</p>
		</button>
	)
}
