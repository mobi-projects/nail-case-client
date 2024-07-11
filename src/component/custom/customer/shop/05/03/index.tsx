export default function Customer_Shop_04_03() {
	const items = Array(6).fill({
		createdAt: "2024.05.28",
		title: "Lorem ipsum dolor sit amet",
		contents:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		likes: 34,
		commentCount: 5,
	})

	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<p className="font-bold mb-6 text-2xl text-Title02">소식</p>
				<p className="cursor-pointer text-Gray40">전체보기</p>
			</div>
			<div className="mt-[15px] grid grid-cols-3 gap-[15px]">
				{items.map((item, index) => (
					<div
						key={index}
						className="flex h-[384px] w-[384px] cursor-pointer flex-col rounded-[26px] bg-gradient-to-b from-transparent to-Gray50 p-[20px]"
					>
						<div className="flex-1 rounded-[26px]"></div>
						<div className="mt-[15px]">
							<p className="text-Headline02 text-White">{item.createdAt}</p>
							<p className="mt-[5px] text-Title03 text-White">{item.title}</p>
							<p className="mt-[5px] text-Body01 text-White">{item.contents}</p>
							<p className="mt-[10px] text-Callout text-White">
								좋아요 {item.likes} · 댓글 {item.commentCount}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
