"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import type { TPost } from "@/type/post"

import MainCard from "./04-01"
import SubCard from "./04-02"

type CardListPT = {
	postArr: Array<TPost>
}

export default function CardList({ postArr }: CardListPT) {
	const cardListTilte = ["전체", "인기글", "공지글"]
	const [isSelected, setIsSelected] = useState(0)
	if (postArr.length === 0) {
		return null
	}
	const [firstPost, ...otherPostArr] = postArr
	const hadleSelected = (idx: number) => {
		setIsSelected(idx)
	}
	return (
		<div className="flex flex-col gap-[18px] pb-[100px]">
			<div>
				<div className="text-Title03 font-SemiBold text-Gray100">
					내 샵 소식을 전달해요
				</div>
				<div className="flex justify-between">
					<div className="flex items-center gap-[18px]">
						{cardListTilte.map((title, idx) => (
							<div
								key={idx}
								onClick={() => hadleSelected(idx)}
								className={`cursor-pointer text-Title03 font-SemiBold ${isSelected === idx ? "text-PB100" : "text-Gray50"}`}
							>
								{title}
							</div>
						))}
					</div>
					<NTButton size="large">소식 작성하기</NTButton>
				</div>
			</div>
			<div className="flex h-fit w-full items-center justify-start gap-[24px] overflow-y-hidden overflow-x-scroll">
				<div className="flex-shrink-0">
					<MainCard content={firstPost.content} srcArr={firstPost.srcArr} />
				</div>
				{otherPostArr.map((post, idx) => {
					return (
						<SubCard
							key={idx}
							createdAt={post.createdAt}
							title={post.title}
							likes={post.likes}
							comments={post.comments}
							srcArr={post.srcArr}
						/>
					)
				})}
			</div>
		</div>
	)
}
