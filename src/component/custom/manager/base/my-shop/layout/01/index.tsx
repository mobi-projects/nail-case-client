"use client"
import { usePathname, useRouter } from "next/navigation"

import { NTBannerImageCarousel } from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTToolbar from "@/component/common/nt-toolbar"
import {
	LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
} from "@/constant/toolbar-list"

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
			<BannerHeader />
			<BannerDescription />
		</div>
	)
}

function BannerHeader() {
	return (
		<div className="absolute left-[90px] top-[95px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | 서울시 용산구
			</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				모비네일 한남
			</h1>
		</div>
	)
}

function BannerDescription() {
	return (
		<div className="absolute left-[90px] top-[280px] flex flex-col gap-4">
			<div className="flex gap-3">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					#네일맛집 #주차가능 #오마카세아트
				</p>
			</div>
			<p className="line-clamp-3 w-[500px] whitespace-pre-wrap text-Body01 text-[18px] font-Regular text-Gray10">
				✨ 매달 네일 오마카세를 제공하는 디자인 맛집 모비네일 {`\n`}
				🔛 현재 당일 예약 가능합니다.
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
