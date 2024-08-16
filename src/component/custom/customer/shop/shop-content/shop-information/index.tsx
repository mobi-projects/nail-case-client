import ShopDetails from "./shop-details"

export default function ShopInformation() {
	return (
		<div>
			<div className="flex min-h-[586px] w-full justify-between px-2 py-5">
				<div className="flex flex-col gap-[20px]">
					<p className="text-Title03">내 샵 정보</p>
					<ShopDetails />
				</div>
				<div className="flex flex-col gap-[20px]">
					<p className="text-Title03">이달의 아트</p>
				</div>
			</div>
		</div>
	)
}
