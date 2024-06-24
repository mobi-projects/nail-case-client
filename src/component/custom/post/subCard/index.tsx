import Image from "next/image"
import React from "react"

import type { TPost } from "@/type/post"
type SubCardPT = Pick<
	TPost,
	"createdAt" | "title" | "likes" | "srcArr" | "comments"
>
export default function SubCard({
	createdAt,
	title,
	likes,
	srcArr,
	comments,
}: SubCardPT) {
	return (
		<div className="h-[253.49px] w-[282px]">
			<div
				className={
					"mb-[9px] flex h-[168px] w-[282px] items-center justify-center rounded-[24px]"
				}
			>
				{srcArr && (
					<Image
						src={srcArr[0]}
						alt="Notice Image"
						width={282}
						height={168}
						className="h-[168px] rounded-[24px]"
					/>
				)}
			</div>

			<div className="text-Headline02 font-Regular text-PB100">
				{createdAt.year + "." + createdAt.month + "." + createdAt.day}
			</div>
			<div className="mt-[5px] truncate text-Headline01 font-Medium text-Gray90">
				{title}
			</div>
			<div className="text-Callout font-SemiBold text-Gray30">
				좋아요 {likes} · 댓글 {comments}
			</div>
		</div>
	)
}
