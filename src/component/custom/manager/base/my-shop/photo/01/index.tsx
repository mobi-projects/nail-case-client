import dayjs from "dayjs"

import { NTButton } from "@/component/common/atom/nt-button"

export default function RegisterImages() {
	return (
		<div className="flex h-fit w-full flex-col justify-between gap-[30px]">
			<ArtOfTheMonth />
			<hr className="h-[1.5px] w-full bg-Gray10" />
			<ShopCoverImage />
		</div>
	)
}

function ArtOfTheMonth() {
	return (
		<div className="flex h-[215px] w-full justify-between gap-x-[28px]">
			<ArtOfTheMonthDashboard />
			<ArtOfTheMonthImageList />
		</div>
	)
}
function ArtOfTheMonthDashboard() {
	const month = dayjs().month() + 1
	return (
		<div className="flex h-full min-w-[176px] flex-col">
			<h2 className="py-3 pl-1 text-Title03 font-SemiBold">이달의 아트</h2>
			<div className="flex h-full w-full flex-col justify-between">
				<div className="pl-1">
					<p className="text-Title03 font-SemiBold">{`${month}월`}</p>
					<p className="text-Title03 font-SemiBold text-PB100">6개</p>
				</div>
				<NTButton icon="addRoundLight" variant={"tertiary"} size={"large"}>
					사진 올리기
				</NTButton>
			</div>
		</div>
	)
}

function ArtOfTheMonthImageList() {
	return (
		<div className="flex h-full w-full flex-col">
			<ShowAllImages />
			<ArtOfTheMonthImages />
		</div>
	)
}
function ShowAllImages() {
	return (
		<div className="flex w-full justify-end py-3 pr-7 text-Body02 font-SemiBold text-Gray30">
			전체보기
		</div>
	)
}
function ArtOfTheMonthImages() {
	return (
		<div className="flex h-full w-fit gap-x-6 pt-[6px]">
			<ImageBox />
			<ImageBox />
			<ImageBox />
			<ImageBox />
			<ImageBox />
		</div>
	)
}
function ImageBox() {
	return (
		<div className="h-[164.85px] w-[180px] rounded-[26px] border drop-shadow" />
	)
}
function ShopCoverImage() {
	return (
		<div className="mb-2 flex h-[215px] w-full justify-between gap-x-[28px]">
			<ShopCoverImageDashBorad />
			<ShopCoverImageImageList />
		</div>
	)
}
function ShopCoverImageDashBorad() {
	return (
		<div className="flex h-full min-w-[176px] flex-col">
			<h2 className="py-3 pl-1 text-Title03 font-SemiBold">대표 사진</h2>
			<div className="flex h-full w-full flex-col justify-between">
				<div className="pl-1">
					<p className="text-Title03 font-SemiBold text-PB100">4개</p>
				</div>
				<NTButton icon="addRoundLight" variant={"tertiary"} size={"large"}>
					사진 올리기
				</NTButton>
			</div>
		</div>
	)
}

function ShopCoverImageImageList() {
	return (
		<div className="flex h-full w-full flex-col">
			<ShowAllImages />
			<ShopCoverImages />
		</div>
	)
}
function ShopCoverImages() {
	return (
		<div className="flex h-full w-fit gap-x-6 pt-[6px]">
			<ImageBox />
			<ImageBox />
			<ImageBox />
			<ImageBox />
			<ImageBox />
		</div>
	)
}
