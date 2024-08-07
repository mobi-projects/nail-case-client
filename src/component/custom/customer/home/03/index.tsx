"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
			<div className="group relative z-10 h-[264px] w-[384px] rounded-[26px] bg-Gray40">
				<Image
					src={mockData.images}
					alt={data.name}
					fill
					priority
					className="rounded-[26px]"
					sizes="384px"
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
type ShopHoverInfoPT = {
	data: TResShop
}
function ShopHoverInfo({ data }: ShopHoverInfoPT) {
	const overview = data.overview.replace(/\\n/g, "\n")
	return (
		<div className="absolute inset-0 flex flex-col justify-between py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">{data.name}</div>
				<div className="line-clamp-4 w-[280px] whitespace-pre-wrap text-Body01 font-SemiBold">
					{overview}
				</div>
			</div>
		</div>
	)
}

function ShopFormInfo({ data }: ShopHoverInfoPT) {
	const router = useRouter()
	return (
		<div>
			<div
				className="cursor-pointer text-Body01 font-SemiBold hover:text-Gray60"
				onClick={() => {
					router.push(`shop/${data.id}`)
				}}
			>
				{data.name}
			</div>
			<div>
				<div className="flex items-center gap-[4px] text-Body01 font-SemiBold text-Gray40"></div>
			</div>
		</div>
	)
}
