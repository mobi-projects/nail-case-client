import NTToolbar from "@/component/common/nt-toolbar"
import { LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR } from "@/constant/toolbar-list"

export default function CustomerToolbar() {
	return (
		<div className="relative flex w-full flex-col items-center pt-4">
			<NTToolbar
				toolList={[...LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR]}
				position="bottom"
				className="items-center"
			/>
			<hr className="absolute left-0 top-[3.38rem] z-[-10] w-full border border-Gray10" />
		</div>
	)
}
