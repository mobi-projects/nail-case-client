import Image from "next/image"
import React from "react"

import type { TPost } from "@/type/post"

type MainCardPT = Pick<TPost, "content" | "srcArr">
export default function MainCard({ content, srcArr }: MainCardPT) {
	return (
		<div className="flex h-[260px] w-[386px] flex-col items-center justify-center rounded-[26px] bg-White py-[4px] shadow-customGray60">
			<div className="mt-[1px] py-[6px] text-Headline02 font-Regular text-PB100">
				NOTICE
			</div>
			<hr className="w-full border border-Gray20"></hr>
			<div className="mt-[15px] flex h-[96px] w-[320px] justify-center">
				{srcArr && srcArr[0] && (
					<Image
						src={srcArr[0]}
						alt="Notice Image"
						width={320}
						height={96}
						className="h-[96px] rounded-[6px]"
					/>
				)}
			</div>
			<div className="my-[21px] line-clamp-2 h-[56px] w-[293px] text-Headline02 font-Regular">
				{content}
			</div>
		</div>
	)
}
