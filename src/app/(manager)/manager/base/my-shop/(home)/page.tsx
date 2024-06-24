import Manager_Base_MyShop_Home_01 from "@/component/custom/manager/base/my-shop/home/01"
import Manager_Base_MyShop_Home_02 from "@/component/custom/manager/base/my-shop/home/02"
import MyShopInfo from "@/component/custom/manager/base/my-shop/home/03"
import Manager_Base_MyShop_Home_04 from "@/component/custom/manager/base/my-shop/home/04"
import Manager_Base_MyShop_Home_05 from "@/component/custom/manager/base/my-shop/home/05"

export default function Home() {
	return (
		<div className="flex flex-col">
			<Manager_Base_MyShop_Home_01 />
			<div className="h-[16px]" />
			<Manager_Base_MyShop_Home_02 />
			<Divider />
			<div className="flex flex-col gap-[20px] pb-[30px] pt-[20px]">
				<p className="text-Title03">내 샵 정보</p>
				<MyShopInfo />
			</div>
			<Divider />
			<div className="flex flex-col gap-[20px] pt-[20px]">
				<p className="text-Title03">필수 예약 사항</p>
				<Manager_Base_MyShop_Home_04 />
			</div>
			<Divider />
			<div className="flex flex-col gap-[20px] pt-[20px]">
				<div className="h-hit flex w-full items-center justify-between">
					<p className="text-Title03">공지</p>
					<p className="text-Headline02 text-Gray40">전체보기</p>
				</div>
				<Manager_Base_MyShop_Home_05 />
			</div>
		</div>
	)
}

function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
