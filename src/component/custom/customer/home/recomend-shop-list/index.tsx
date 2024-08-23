"use client"
import Image from "next/image"

import PromotionImage from "@/../public/asset/nail-image-01.jpg"
import { cn } from "@/config/tailwind"

export default function RecomendShopList() {
	return (
		<div className="flex h-fit w-fit flex-col gap-[20px] border-t border-t-Gray20 pt-10">
			<ShopListTitle />
			<div className="flex flex-wrap gap-[24px]">
				{[1, 2, 3, 5, 6, 7].map((_, idx) => {
					return <ShopForm key={idx} />
				})}
			</div>
		</div>
	)
}

function ShopListTitle() {
	return (
		<div className="flex w-full justify-between pr-[20.5px]">
			<div className="text-Title03 font-SemiBold">NewTips 추천 샾👣</div>
		</div>
	)
}

function ShopForm() {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<ShopName />
			<div className="group relative z-10 h-[264px] w-[384px] rounded-[26px] bg-Gray40">
				<Image
					src={PromotionImage}
					alt={"추천네일샾 이미지"}
					fill
					className="rounded-[26px]"
					sizes="384px"
				/>
				<div
					className={cn(
						"absolute inset-0 rounded-[26px] bg-gradient-to-tr from-Black to-White opacity-0 transition-opacity duration-300 group-hover:opacity-60",
						// data.likedByUser && "group-hover:opacity-30",
					)}
				/>
				<ShopHoverInfo />
			</div>
		</div>
	)
}

function ShopHoverInfo() {
	return (
		<div className="absolute inset-0 flex flex-col justify-between py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">가게이름?</div>
				<div className="line-clamp-4 w-[280px] whitespace-pre-wrap text-Body01 font-SemiBold">
					가게 설명?
				</div>
			</div>
		</div>
	)
}

function ShopName() {
	// const router = useRouter()
	return (
		<div>
			<div
				className="cursor-pointer pl-4 text-Body01 font-SemiBold hover:text-Gray60"
				onClick={() => {
					// router.push(`shop/${data.id}`)
				}}
			>
				가게이름
			</div>
			<div>
				<div className="flex items-center gap-[4px] text-Body01 font-SemiBold text-Gray40" />
			</div>
		</div>
	)
}
