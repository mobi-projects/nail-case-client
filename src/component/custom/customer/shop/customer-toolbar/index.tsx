import NTToolbar from "@/component/common/nt-toolbar"
import { LABEL_LIST_FOR_CUSTOMER_SHOP_TOOLBAR } from "@/constant/toolbar-list"

export default function CustomerToolbar() {
	return (
		<div className="relative flex w-full flex-col pt-4">
			<NTToolbar
				toolList={[...LABEL_LIST_FOR_CUSTOMER_SHOP_TOOLBAR]}
				position="bottom"
				className="items-center gap-10"
			/>
			<hr className="absolute left-0 top-[3.38rem] z-[-10] w-full border border-Gray10" />
		</div>
	)
}
