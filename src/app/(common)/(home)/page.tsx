import BrandInfo from "@/component/custom/common/home/01"
import CommonHomeToolbar from "@/component/custom/common/home/02"
import ShopCardList from "@/component/custom/common/home/03"

export default function CommonHome() {
	return (
		<div className="grid h-dvh w-full grid-rows-[2fr_auto_3fr] items-center">
			<BrandInfo />
			<div className="h-[2px] w-full">
				<hr className="absolute left-0 w-full border-[1px] border-Gray20" />
			</div>
			<div className="item-center flex h-full w-full flex-col gap-[40px] py-[40px]">
				<p className="text-Title03 font-SemiBold text-Gray100">
					주변 네일샵을 추천해드릴게요.
				</p>
				<CommonHomeToolbar />
				<ShopCardList />
			</div>
		</div>
	)
}
