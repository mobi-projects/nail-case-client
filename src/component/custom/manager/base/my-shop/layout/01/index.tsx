"use client"
import { usePathname, useRouter } from "next/navigation"

import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTToolbar from "@/component/common/nt-toolbar"
import {
	LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
} from "@/constant/toolbar-list"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

import EditIntroduction from "../modal/01"

type BannerItemPT = { shopInfo: TShopInfo }

export default function ManagerMyShopLayout() {
	return (
		<div className="h-fit w-full">
			<MyShopBanner />
			<MyShopToolbar />
		</div>
	)
}
function MyShopBanner() {
	const { handleCarousel, carouselIdx } = useBanner()
	const { shopInfo } = useShopInfo()
	const { onOpenModal } = useModal()
	if (!shopInfo)
		return <div className="h-[432.47px] w-full">Loading Banner....</div>

	const onClickPencil = () => {
		onOpenModal({
			size: "small",
			children: <EditIntroduction />,
		})
	}

	return (
		<div className="h-[432.47px] w-full">
			<BannerCarousel type="manager" handleCarousel={handleCarousel}>
				<NTContent mode="dark" className="absolute left-[90px] top-10">
					미리보기
				</NTContent>
				<NTContent
					mode="dark"
					className="absolute left-[205px] top-10"
				>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
				<NTIcon
					icon="setting"
					className="absolute right-12 top-10 h-6 w-6 text-White"
				/>
				<NTIcon
					icon="pencil"
					className="absolute right-12 top-[280px] h-6 w-6 text-White"
					onClick={onClickPencil}
				/>
				<BannerHeader shopInfo={shopInfo} />
				<BannerDesciption shopInfo={shopInfo} />
			</BannerCarousel>
		</div>
	)
}

function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName } = shopInfo
	return (
		<div className="absolute left-[90px] top-[95px]">
			<p className="text-Callout text-[14px] font-Light text-White">{`${specialty}  |  ${address}`}</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{shopName}
			</h1>
		</div>
	)
}

function BannerDesciption({ shopInfo }: BannerItemPT) {
	const { hashtagArr, overview } = shopInfo
	return (
		<div className="absolute left-[90px] top-[280px] z-10">
			<div className="flex gap-3">
				{hashtagArr.map((hashtag, idx) => (
					<p
						key={idx}
						className="text-Body01 text-[18px] font-SemiBold text-White"
					>
						{hashtag}
					</p>
				))}
			</div>
			<p className="line-clamp-3 w-[500px] text-Body01 text-[18px] font-Regular text-Gray10">
				{overview}
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
			<hr className="absolute bottom-[0.25px] -z-10 w-full border bg-Gray20" />
		</div>
	)
}
