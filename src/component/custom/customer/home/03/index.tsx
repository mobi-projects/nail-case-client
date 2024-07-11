import NTIcon from "@/component/common/nt-icon"

import type { TShop } from "./type"

type ShopListFomrPT = {
	listData: Array<TShop>
}
export default function ShopListForm({ listData }: ShopListFomrPT) {
	return (
		<div className="flex flex-col gap-[20px]">
			<ShopListTitle />
			<div className="flex gap-[24px]">
				{listData.map((data, idx) => (
					<ShopForm key={idx} data={data} />
				))}
			</div>
		</div>
	)
}
function ShopListTitle() {
	return (
		<div className="flex justify-between pr-[20.5px]">
			<div className="text-Title03 font-SemiBold">내가 좋아한 네일샵 ✨</div>
			<div className="text-Headline02 text-Gray40">전체보기</div>
		</div>
	)
}
type ShopFormPT = {
	data: TShop
}
function ShopForm({ data }: ShopFormPT) {
	return (
		<div className="flex flex-col gap-[13px]">
			<div className="group relative h-[264px] w-[384px] rounded-[26px] bg-Gray40">
				<NTIcon
					icon="favoriteFill"
					className={`absolute right-[18px] top-[21px] text-Headline01 ${data.liked ? "text-PY100" : "text-White"} `}
				/>
				<div
					className={`absolute inset-0 rounded-[26px] bg-gradient-to-tr from-Black to-White opacity-0 transition-opacity duration-300 ${data.liked ? "group-hover:opacity-30" : "group-hover:opacity-60"}`}
				></div>
				<ShopHoverInfo data={data} />
			</div>
			<ShopFormInfo data={data} />
		</div>
	)
}
function ShopHoverInfo({ data }: ShopFormPT) {
	return (
		<div className="absolute inset-0 flex flex-col justify-between py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">{data.title}</div>
				<div className="max-w-[300px] whitespace-pre-wrap text-Body01 font-SemiBold">
					{data.content}
				</div>
			</div>
			<div className="hover:text-Gray60">예약하러가기</div>
		</div>
	)
}
function ShopFormInfo({ data }: ShopFormPT) {
	const formatDistance = (distance: number): string => {
		if (distance < 1) {
			return `${distance * 1000}m`
		} else {
			return `${distance}km`
		}
	}
	return (
		<div>
			<div className="text-Body01 font-SemiBold">{data.title}</div>
			<div>
				<div className="flex items-center gap-[4px] text-Body01 font-SemiBold text-Gray40">
					<span>{data.location}</span>
					<div className="h-1 w-1 rounded-full bg-Gray40" />
					<span>{formatDistance(data.distance)}</span>
				</div>
			</div>
		</div>
	)
}
