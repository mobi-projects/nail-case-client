import Manager_Base_MyShop_Post_01 from "@/component/custom/manager/base/my-shop/post/01/page"
import Manager_Base_MyShop_Post_02 from "@/component/custom/manager/base/my-shop/post/02/page"

export default function Post() {
	return (
		<div className="flex w-full flex-col gap-[20px] pt-[20px]">
			<p className="text-Title03 text-Gray100">소식</p>
			<Manager_Base_MyShop_Post_01 />
			<Manager_Base_MyShop_Post_02 />
		</div>
	)
}
