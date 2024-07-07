import Image from "next/image"

import Shop01Main from "@/../public/asset/dev/shop/01_main.webp"
import NTIcon from "@/component/common/nt-icon"

export default function ShopCardList() {
	return (
		<div className="flex h-fit w-full flex-col items-center">
			<ShopCard />
		</div>
	)
}

function ShopCard() {
	return (
		<div className="a grid h-[250px] w-full cursor-pointer grid-cols-[250px_1fr] gap-5 overflow-hidden">
			<div className="relative h-full w-full overflow-hidden rounded-[12px]">
				<Image
					src={Shop01Main}
					alt="shop_thumbnail"
					fill
					className="h-full w-full"
				/>
			</div>
			<div className="flex h-full w-full flex-col justify-between gap-2 rounded-[12px] border-[1px] border-Gray20/30 p-[20px]">
				<div className="flex flex-col gap-[10px]">
					<p className="text-Title02 font-SemiBold">모비네일 한남점</p>
					<p className="text-Body01 font-Regular">
						✨ 매달 네일 오마카세를 제공하는 디자인 맛집 모비네일
					</p>
				</div>

				<div className="flex h-fit w-full items-center gap-[15px]">
					<Rating />
					<span className="text-Body02 font-Regular text-Gray40">
						네일아트 전문 | 서울시 용산구
					</span>
				</div>
			</div>
		</div>
	)
}
function Rating() {
	return (
		<div className="flex w-fit items-center gap-[5px]">
			<NTIcon icon="starFull" className="text-PY100" />
			<p className="text-Headline02 font-Bold">4.5</p>
		</div>
	)
}
