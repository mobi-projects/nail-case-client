import React from "react"

import type { TPost } from "@/type/post"

export const PostCard: React.FC<TPost> = ({
	createdAt,
	title,
	likes,
	comments,
}) => {
	return (
		<div className="mr-[20px] h-[253.49px] w-[282px]">
			<div
				className={
					"mb-[10px] h-[168px] w-[282px] rounded-[24px] border bg-White drop-shadow"
				}
			></div>
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
