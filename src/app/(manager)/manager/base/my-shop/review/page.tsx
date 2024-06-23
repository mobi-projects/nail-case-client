import Manager_Base_MyShop_Review_01 from "@/component/custom/manager/base/my-shop/review/01"
import ReviewTitleheader from "@/component/custom/manager/base/my-shop/review/02"
import Manager_Base_MyShop_Review_03 from "@/component/custom/manager/base/my-shop/review/03"
import Manager_Base_MyShop_Review_04 from "@/component/custom/manager/base/my-shop/review/04"

export default function Review() {
	return (
		<div className="flex w-full flex-col gap-[20px] pt-[20px]">
			<Manager_Base_MyShop_Review_01 />
			<div className="mt-[24px] flex h-[72px] w-full flex-col justify-between">
				<Divider />
				<ReviewTitleheader />
				<Divider />
			</div>
			<Manager_Base_MyShop_Review_03 />
			<Manager_Base_MyShop_Review_04 />
		</div>
	)
}
function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
