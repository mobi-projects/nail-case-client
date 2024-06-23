import Manager_Base_MyShop_Photo_01 from "@/component/custom/manager/base/my-shop/photo/01"
import PreviewImages from "@/component/custom/manager/base/my-shop/photo/02"

export default function ManagerBaseMyShopPhoto() {
	return (
		<div className="flex w-full flex-col gap-[20px] pt-[20px]">
			<Manager_Base_MyShop_Photo_01 />
			<hr className="h-[1.5px] w-full bg-Gray10" />
			<PreviewImages />
		</div>
	)
}
