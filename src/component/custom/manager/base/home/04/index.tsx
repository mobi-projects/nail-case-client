import type { TPost } from "@/type/post"

import MainCard from "./04-01"
import SubCard from "./04-02"

type CardListPT = {
	postArr: Array<TPost>
}

export default function CardList({ postArr }: CardListPT) {
	if (postArr.length === 0) {
		return null
	}
	const [firstPost, ...otherPostArr] = postArr
	return (
		<div className="flex h-fit w-[1200px] items-center overflow-y-hidden overflow-x-scroll">
			<MainCard content={firstPost.content} srcArr={firstPost.srcArr} />
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
	)
}
