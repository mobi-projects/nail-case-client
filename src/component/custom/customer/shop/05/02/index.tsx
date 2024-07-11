import NTIcon from "@/component/common/nt-icon"

const tempData = [
	{
		title: "썸머 나이트 글로우",
		description:
			"여름 밤의 낭만을 담은 반짝이는 글로우 네일 아트로, 손끝을 화려하게 빛내보세요.",
	},
	{
		title: "로맨틱 플라워 네일",
		description:
			"우아하고 세련된 플라워 패턴 네일 아트로, 손끝에 로맨틱한 감성을 더해보세요.",
	},
	{
		title: "코랄 리프 네일",
		description:
			"산호초의 아름다움을 담은 코랄 리프 네일 아트로, 활기찬 여름을 맞이해보세요.",
	},
	{
		title: "골든 트위스트 네일",
		description:
			"화려한 금빛 트위스트 패턴으로 손끝에 고급스러움을 더해보세요.",
	},
	{
		title: "블루 오션 네일",
		description:
			"깊고 푸른 바다의 색감을 담은 네일 아트로, 시원한 여름을 즐겨보세요.",
	},
	{
		title: "핑크 파스텔 네일",
		description: "부드러운 파스텔 핑크 톤으로 손끝에 사랑스러움을 더해보세요.",
	},
]

export default function Customer_Shop_04_02() {
	return (
		<div className="flex w-full flex-col">
			<div className="flex items-center justify-between">
				<p className="font-bold mb-6 text-2xl text-Title02">디자인</p>
				<p className="cursor-pointer text-Gray40">전체보기</p>
			</div>
			<div className="mt-[15px] grid grid-cols-3 gap-6">
				{tempData.map((item, index) => (
					<div
						key={index}
						className="relative flex h-[264px] flex-col justify-center rounded-[26px] bg-Gray40 p-[16px] text-white"
					>
						<h3 className="font-semibold text-Headline01 text-PY80">
							{item.title}
						</h3>
						<p className="mt-[8px] text-Body01">{item.description}</p>
						<div className="mt-[40px] flex cursor-pointer items-center">
							<p className="text-Body01">자세히 보기</p>
							<NTIcon icon={"expandRightLight"} className="w-[24px]" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
