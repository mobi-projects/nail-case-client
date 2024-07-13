import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import type { TResShop } from "@/type/mainPage"

import type { TShop } from "./type"

type ShopListFomrPT = {
	listData: Array<TResShop>
	listMockData: Array<TShop>
}
export default function ShopListForm({
	listData = [],
	listMockData,
}: ShopListFomrPT) {
	return (
		<div className="flex h-fit w-fit flex-col gap-[20px]">
			<ShopListTitle />
			<div className="flex gap-[24px]">
				{listData.map((data, idx) => {
					return <ShopForm key={idx} data={data} mockData={listMockData[idx]} />
				})}
			</div>
		</div>
	)
}
function ShopListTitle() {
	return (
		<div className="flex w-full justify-between pr-[20.5px]">
			<div className="text-Title03 font-SemiBold">내가 좋아한 네일샵 ✨</div>
			<div className="text-Headline02 text-Gray40">전체보기</div>
		</div>
	)
}
type ShopFormPT = {
	data: TResShop
	mockData: TShop
}
function ShopForm({ data, mockData }: ShopFormPT) {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<div className="group relative h-[264px] w-[384px] rounded-[26px] bg-Gray40">
				<Image
					src={mockData.images}
					alt={data.shopName}
					layout="fill"
					objectFit="cover"
					className="rounded-[26px]"
				/>
				<NTIcon
					icon="favoriteFill"
					className={`absolute right-[18px] top-[21px] text-Headline01 ${mockData.liked ? "text-PY100" : "text-White"}`}
				/>
				<div
					className={`absolute inset-0 rounded-[26px] bg-gradient-to-tr from-Black to-White opacity-0 transition-opacity duration-300 ${mockData.liked ? "group-hover:opacity-30" : "group-hover:opacity-60"}`}
				></div>
				<ShopHoverInfo data={data} mockData={mockData} />
			</div>
			<ShopFormInfo data={data} />
		</div>
	)
}
function ShopHoverInfo({ data, mockData }: ShopFormPT) {
	return (
		<div className="absolute inset-0 flex flex-col justify-between py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">{data.shopName}</div>
				<div className="max-w-[300px] whitespace-pre-wrap text-Body01 font-SemiBold">
					{mockData.content}
				</div>
			</div>
			<div className="hover:text-Gray60">예약하러가기</div>
		</div>
	)
}
type ShopFormInfoPT = {
	data: TResShop
}
function ShopFormInfo({ data }: ShopFormInfoPT) {
	return (
		<div>
			<div className="text-Body01 font-SemiBold">{data.shopName}</div>
			<div>
				<div className="flex items-center gap-[4px] text-Body01 font-SemiBold text-Gray40">
					<span>{data.address}</span>
				</div>
			</div>
		</div>
	)
}
