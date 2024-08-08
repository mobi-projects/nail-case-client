import ShopInfoCardList from "@/component/custom/customer/shop/04"

import { ButtonList } from "./button-list/indest"
import { useScroll } from "./scroll-context"

type CustomerShopContentPT = { shopId: number }

export default function CustomerShopContent({ shopId }: CustomerShopContentPT) {
	const { shopInfoRef } = useScroll()

	return (
		<div className="flex w-full flex-col">
			<div ref={shopInfoRef} className="flex w-full flex-col gap-5 pt-8">
				<ShopInfoCardList />
				<ButtonList shopId={shopId} />
			</div>
		</div>
	)
}

export function ErrorComponent() {
	return (
		<div className="w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중에 오류가 발생했습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

export function NotFountComponent() {
	return (
		<div className="w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터가 존재하지 않습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

export function PendingComponent() {
	return (
		<div className="h-full w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중입니다.
				<p className="py-[50px] text-Gray70">잠시만 기다려 주세요.</p>
			</div>
		</div>
	)
}
