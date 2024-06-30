import { faker } from "@faker-js/faker"
import Image from "next/image"

import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"

type TPostCard = {
	title: string
	imgSrc: string
	likes: number
	comments: number
	createAt: number
}

export default function PostCardList() {
	/** [TODO] 👇 추후에 삭제 : 게시글 목록 조회 */
	const postMockDataArr = Array.from({ length: 10 }, (_, idx) => ({
		id: idx,
		title: faker.lorem.sentence({ min: 2, max: 300 }),
		imgSrc: faker.image.url(),
		likes: faker.number.int({ min: 0, max: 1000 }),
		comments: faker.number.int({ min: 0, max: 1000 }),
		createAt: faker.date.anytime().getTime(),
	}))
	return (
		<div className="flex h-fit w-full flex-col gap-[24px]">
			{postMockDataArr.map((postData) => (
				<PostCard
					key={postData.id}
					title={postData.title}
					imgSrc={postData.imgSrc}
					likes={postData.likes}
					comments={postData.comments}
					createAt={postData.createAt}
				/>
			))}
		</div>
	)
}

function PostCard({ title, imgSrc, likes, comments, createAt }: TPostCard) {
	return (
		<div className="grid h-[160px] w-full cursor-pointer grid-cols-[233px_1fr] gap-[24px] rounded-[26px] px-[25px] py-[20px] shadow-customGray60 transition-all hover:scale-105">
			<PostThumbnail {...{ imgSrc }} />
			<PostSummary {...{ title, likes, comments, createAt }} />
		</div>
	)
}
function PostThumbnail({ imgSrc }: Pick<TPostCard, "imgSrc">) {
	return (
		<div className="relative block h-full w-full overflow-hidden rounded-[6px]">
			<Image
				src={imgSrc}
				width="233"
				height="160"
				alt="post-thumbnail"
				loading="lazy"
			/>
		</div>
	)
}

function PostSummary({ createAt, title, likes, comments }: Partial<TPostCard>) {
	return (
		<div className="grid h-full w-full grid-rows-[28px_63px_20px] gap-[4px]">
			<CreateAt {...{ createAt }} />
			<Title {...{ title }} />
			<Interest {...{ likes, comments }} />
		</div>
	)
}
function CreateAt({ createAt }: Partial<TPostCard>) {
	const year = getYearFromStamp(createAt!)
	const month = getMonthFromStamp(createAt!)
	const date = getMonthFromStamp(createAt!)
	const result = `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
	return <p className="text-nowrap text-Body01 text-PB100">{result}</p>
}
function Title({ title }: Partial<TPostCard>) {
	return (
		<p className="text-overflow-2 line-clamp-2 h-[63px] w-full overflow-hidden text-wrap break-keep text-Body01 leading-8 text-Gray80">
			{title!}
		</p>
	)
}
function Interest({ likes, comments }: Partial<TPostCard>) {
	return (
		<div className="flex w-full gap-[4px] text-Callout text-Gray30">
			<p>좋아요 {likes}</p>
			<p>•</p>
			<p>댓글 {comments}</p>
		</div>
	)
}
