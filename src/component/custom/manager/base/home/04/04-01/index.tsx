import Image from "next/image"
import React from "react"

import type { TPost } from "@/type/post"

type MainCardPT = Pick<TPost, "content" | "srcArr">
export default function MainCard({ content, srcArr }: MainCardPT) {
	return (
		<div className="mr-[20px] min-w-[384px]">
			<div className="flex h-[260px] w-[384px] flex-col items-center rounded-[26px] border py-[25px] drop-shadow">
				<div className="mb-[10px] text-center text-Headline02 text-PB100">
					NOTICE
				</div>
				<div className="mb-[10px] w-full border-b-[2px] border-Gray10"></div>
				<div className="mb-[10px] flex justify-center">
					{srcArr && srcArr[0] && (
						<Image
							src={srcArr[0]}
							alt="Notice Image"
							width={320}
							height={96}
							className="mt-[10px] h-[96px] rounded-[6px]"
						/>
					)}
				</div>
				<div className="line-clamp-2 flex h-[56px] w-[293px] justify-center px-[20px] text-center">
					{content}
				</div>
			</div>
		</div>
	)
}
