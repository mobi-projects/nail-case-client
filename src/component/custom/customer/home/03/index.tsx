import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { TResShop } from "@/type/main-page"

import type { TShop } from "./type"

type ShopListFomrPT = {
	listData: Array<TResShop>
	listMockData: Array<TShop>
	formTitle: string
}
export default function ShopListForm({
	listData = [],
	listMockData,
	formTitle,
}: ShopListFomrPT) {
	return (
		<div className="flex h-fit w-fit flex-col gap-[20px]">
			<ShopListTitle formTitle={formTitle} />
			<div className="flex gap-[24px]">
				{listData.map((data, idx) => {
					return <ShopForm key={idx} data={data} mockData={listMockData[idx]} />
				})}
			</div>
		</div>
	)
}
type ShopListTitlePT = {
	formTitle: string
}
function ShopListTitle({ formTitle }: ShopListTitlePT) {
	return (
		<div className="flex w-full justify-between pr-[20.5px]">
			<div className="text-Title03 font-SemiBold">{formTitle}</div>
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
					className={cn(
						"absolute right-[18px] top-[21px] text-Headline01 text-White",
						data.likedByUser && "text-PY100",
					)}
				/>
				<div
					className={cn(
						"absolute inset-0 rounded-[26px] bg-gradient-to-tr from-Black to-White opacity-0 transition-opacity duration-300 group-hover:opacity-60",
						data.likedByUser && "group-hover:opacity-30",
					)}
				/>
				<ShopHoverInfo data={data} />
			</div>
			<ShopFormInfo data={data} />
		</div>
	)
}
function ShopHoverInfo({ data }: ShopHoverInfoPT) {
	return (
		<div className="absolute inset-0 flex flex-col justify-between py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">{data.shopName}</div>
				<div className="max-w-[300px] whitespace-pre-wrap text-Body01 font-SemiBold">
					{data.overview}
				</div>
			</div>
			<div className="hover:text-Gray60">예약하러가기</div>
		</div>
	)
}
type ShopHoverInfoPT = {
	data: TResShop
}
function ShopFormInfo({ data }: ShopHoverInfoPT) {
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
