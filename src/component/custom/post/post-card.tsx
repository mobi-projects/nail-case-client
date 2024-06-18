import Image from "next/image"
import React from "react"

import type { TPost } from "@/type/post"
type PostCardPT = Pick<
	TPost,
	"createdAt" | "title" | "likes" | "srcArr" | "comments"
>
export default function PostCard({
	createdAt,
	title,
	likes,
	srcArr,
	comments,
}: PostCardPT) {
	return (
		<div className="mr-[20px] h-[253.49px] w-[282px]">
			<div
				className={
					"mb-[10px] flex h-[168px] w-[282px] items-center justify-center rounded-[24px] border bg-White drop-shadow"
				}
			>
				{srcArr && (
					<Image
						src={srcArr[0]}
						alt="Notice Image"
						width={270}
						height={96}
						className="mt-[10px] h-[96px] rounded-[6px]"
					/>
				)}
			</div>

			<div className="text-Headline02 text-PB100">
				{createdAt.year + "." + createdAt.month + "." + createdAt.day}
			</div>
			<div className="truncate text-Headline01 text-Gray90">{title}</div>
			<div className="text-Callout text-Gray30">
				좋아요 {likes} · 댓글 {comments}
			</div>
		</div>
	)
}
