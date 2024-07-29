"use client"
import { usePathname, useRouter } from "next/navigation"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTToolbar from "@/component/common/nt-toolbar"
import {
	LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
} from "@/constant/toolbar-list"
import { useShopById } from "@/hook/use-shop-controller"
import type { TResGetShopById } from "@/type/shop"

import EditIntroduction from "../modal/01"

export default function ManagerBaseMyShopBanner() {
	return (
		<div className="h-fit w-full">
			<MyShopBanner />
			<MyShopToolbar />
		</div>
	)
}
function MyShopBanner() {
	const { onOpenModal } = useModal()
	const { data, isError, error, isLoading } = useShopById(1)
	if (isError) {
		return <div>Error: {error.message}</div>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}

	const shopData = data?.data as TResGetShopById
	const onClickPencil = () => {
		onOpenModal({
			size: "small",
			children: <EditIntroduction />,
		})
	}

	return (
		<div className="relative h-[432.47px] w-full">
			<NTBannerImageCarousel className="absolute left-0 h-full w-full bg-transparent" />
			<NTContent mode="dark" className="absolute left-[90px] top-10">
				미리보기
			</NTContent>
			<NTContent mode="dark" className="absolute left-[205px] top-10">
				0/0
			</NTContent>
			<NTIcon
				icon="setting"
				className="absolute right-12 top-10 h-6 w-6 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]"
			/>
			<NTIcon
				icon="pencil"
				className="absolute right-12 top-[280px] h-6 w-6 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]"
				onClick={onClickPencil}
			/>
			<BannerHeader shopData={shopData} />
			<BannerDescription shopData={shopData} />
		</div>
	)
}

type BannerHeaderPT = { shopData: TResGetShopById }
function BannerHeader({ shopData }: BannerHeaderPT) {
	const shopAddress = shopData.address.split(" ").slice(0, 2).join(" ")
	return (
		<div className="absolute left-[90px] top-[95px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | {shopAddress}
			</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{shopData.shopName}
			</h1>
		</div>
	)
}

function BannerDescription({ shopData }: BannerHeaderPT) {
	const tagList = shopData.tags.map((tag) => `#${tag}`).join(" ")
	return (
		<div className="absolute left-[90px] top-[280px] flex flex-col gap-4">
			<div className="flex gap-3">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					{tagList}
				</p>
			</div>
			<p className="line-clamp-3 w-[500px] whitespace-pre-wrap text-Body01 text-[18px] font-Regular text-Gray10">
				{shopData.overview}
			</p>
		</div>
	)
}

function MyShopToolbar() {
	const pathName = usePathname()
	const router = useRouter()
	const focusedIdx = PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR.findIndex(
		(toolPath) => toolPath === pathName,
	)
	const onClickTool = (idx: number) =>
		router.push(PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR[idx])
	return (
		<div className="relative flex h-fit items-center justify-center pt-[20px] text-[18px] font-SemiBold">
			<NTToolbar
				toolList={[...LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR]}
				focusedIdx={focusedIdx}
				onClickTool={onClickTool}
			/>
			<hr className="absolute bottom-[0.25px] w-full border bg-Gray20" />
		</div>
	)
}
