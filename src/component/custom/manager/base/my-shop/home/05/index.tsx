"use client"

import Image from "next/image"

import { usePostArr } from "@/hook/use-common"
import type { TPost } from "@/type/post"

export default function NoticeBoard() {
	const { postArr } = usePostArr()

	return (
		<div className="flex flex-col">
			{postArr?.map((post, idx) => {
				return <NoticeCard post={post} key={idx} />
			})}
		</div>
	)
}

type PostPT = {
	post: TPost
}

function NoticeCard({ post }: PostPT) {
	return (
		<div className="mb-[20px] flex h-[260px] w-full items-center rounded-[26px] border px-[40px] drop-shadow">
			<Image
				src={post.srcArr[0]}
				alt="Notice Image"
				width={346}
				height={204}
				style={{ height: "204px" }}
				className="rounded-[8px]"
			/>
			<div className="ml-[50px] flex h-[204px] flex-col justify-between">
				<div className="border-b-Gray10 pb-[15px] text-Title03">
					{post.title}
				</div>
				<div className="border-t-[1.5px] border-Gray10 pb-[15px]"></div>
				<div className="flex w-[761.77px] justify-between">
					<div className="line-clamp-5 w-[346px] text-Headline02 text-Gray50">
						{post.content}
					</div>
					<div className="flex items-end text-Callout text-Gray30">
						좋아요 {post.likes} · 댓글 {post.comments}
					</div>
				</div>
			</div>
		</div>
	)
}
