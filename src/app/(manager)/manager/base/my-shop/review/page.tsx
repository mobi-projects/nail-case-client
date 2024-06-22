import Manager_Base_MyShop_Review_01 from "@/component/custom/manager/base/my-shop/review/01"
import Manager_Base_MyShop_Review_02 from "@/component/custom/manager/base/my-shop/review/02"
import ReviewList from "@/component/custom/manager/base/my-shop/review/03"
import Manager_Base_MyShop_Review_04 from "@/component/custom/manager/base/my-shop/review/04"

export default function Review() {
	return (
		<div className="flex w-full flex-col gap-[18px] pt-[20px]">
			<Manager_Base_MyShop_Review_01 />
			<div className="mt-[24px] flex h-[72px] w-full flex-col justify-between">
				<Divider />
				<Manager_Base_MyShop_Review_02 />
				<Divider />
			</div>
			<ReviewList />
			<Manager_Base_MyShop_Review_04 />
		</div>
	)
}
function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
