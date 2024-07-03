"use client"

import type { HTMLAttributes, PropsWithChildren } from "react"

import { cn } from "@/config/tailwind"

export default function SocialLoginButtonList() {
	return (
		<div className="flex h-fit flex-col items-center justify-center gap-[15px]">
			<SocialLoginButton className="bg-[#FEE500] text-[#191919]">
				Kakao
			</SocialLoginButton>
			<SocialLoginButton
				isDisabled={true}
				className="bg-[#2DB400] text-[#FFFFFF]"
			>
				Naver
			</SocialLoginButton>
			<SocialLoginButton
				isDisabled={true}
				className="bg-gradient-to-tr from-[#FFD96B] via-[#FF2395] to-[#AD23F1] text-[#FFFFFF]"
			>
				Instagram
			</SocialLoginButton>
			<SocialLoginButton
				isDisabled={true}
				className="bg-[#3C599B] text-[#FFFFFF]"
			>
				Facebook
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
