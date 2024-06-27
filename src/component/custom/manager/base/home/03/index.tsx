"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { createPostArr } from "@/mock"
import type { TPost } from "@/type/post"

export default function CardListForm() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])
	if (!isClient) {
		return null
	}

	const postArr = createPostArr()
	return (
		<div className="h-[430px] w-full pt-[6.5px]">
			<div className="flex h-fit w-full flex-col overflow-x-hidden">
				<CardList postArr={postArr} />
			</div>
		</div>
	)
}
type CardListPT = {
	postArr: Array<TPost>
}

function CardList({ postArr }: CardListPT) {
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
		<div className="flex flex-col gap-[30px]">
			<div className="flex flex-col gap-[8px]">
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
			<div className="scrollbar-custom flex h-fit w-full items-center justify-start gap-[24px] overflow-y-hidden overflow-x-scroll pb-[42px] pt-[10px]">
				<div className="flex-shrink-0">
					<MainCard content={firstPost.content} srcArr={firstPost.srcArr} />
				</div>
				{otherPostArr.map((post, idx) => {
					return (
						<div key={idx} className="flex-shrink-0">
							<SubCard
								createdAt={post.createdAt}
								title={post.title}
								likes={post.likes}
								comments={post.comments}
								srcArr={post.srcArr}
							/>
						</div>
					)
				})}
				<div className="h-full w-[282px] flex-shrink-0 bg-White"></div>
			</div>
		</div>
	)
}
type MainCardPT = Pick<TPost, "content" | "srcArr">
function MainCard({ content, srcArr }: MainCardPT) {
	return (
		<div className="flex h-[260px] w-[384px] flex-shrink-0 flex-col items-center justify-center rounded-[26px] bg-White py-[4px] shadow-customGray60">
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
type SubCardPT = Pick<
	TPost,
	"createdAt" | "title" | "likes" | "srcArr" | "comments"
>
function SubCard({ createdAt, title, likes, srcArr, comments }: SubCardPT) {
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
