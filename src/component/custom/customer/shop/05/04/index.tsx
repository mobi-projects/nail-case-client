import NTOption from "@/component/common/nt-option"

export default function Customer_Shop_04_04() {
	const reviews = Array(6).fill({
		username: "닉네임",
		visitCount: 3,
		visitDate: "5월 24일 방문",
		rating: 4,
		tags: ["이달의 아트", "동반 2인", "타샵 제거 있음", "1인 연장 필요"],
		contents:
			"이번 네일 너무 섬세하고 예쁘게 잘 해주셔서 너무 너무 맘에 들어요. 다음에도 또 방문할게요. :)",
	})

	return (
		<div className="w-full p-[16px]">
			<div className="flex items-center justify-between">
				<p className="font-bold mb-6 text-2xl text-Title02">리뷰</p>
				<p className="cursor-pointer text-Gray40">전체보기</p>
			</div>
			<div className="flex flex-col gap-6">
				{reviews.map((review, idx) => (
					<div
						key={idx}
						className="transform rounded-lg bg-white p-[24px] shadow-customGray transition duration-500 hover:shadow-xl"
					>
						<div className="mb-[16px] flex items-center">
							<p className="font-semibold text-Headline02 text-lg">
								{review.username}
							</p>
							<span className="ml-[12px] text-sm text-gray-500">
								{review.visitCount}번째 방문 · {review.visitDate}
							</span>
						</div>
						<div className="mb-[16px] flex items-center">
							<div className="flex">
								{Array.from({ length: review.rating }, (_, idx) => (
									<span key={idx} className="text-[24px] text-PB100">
										★
									</span>
								))}
								{Array.from({ length: 5 - review.rating }, (_, idx) => (
									<span key={idx} className="text-[24px] text-gray-300">
										★
									</span>
								))}
							</div>
						</div>
						<div className="mb-[16px] flex flex-wrap gap-2">
							<NTOption optionArr={review.tags} />
						</div>
						<div className="flex">
							<div className="mr-[16px] h-[100px] w-[100px] rounded-[14px] bg-gray-200"></div>
							<p className="leading-relaxed text-gray-700">{review.contents}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
