"use client"
import NTToolbar from "@/component/common/nt-toolbar"
import { useToolbar } from "@/hook/use-component"

export default function CustomerNaviBar() {
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"디자인",
		"소식",
		"리뷰",
	])
	return (
		<div className="flex h-fit w-full flex-col items-center justify-center">
			<NTToolbar
				arr={toolbarArr}
				isSelected={hadleSelected}
				selected={isSelected}
				position="bottom"
			/>
			<hr className="w-full" />
		</div>
	)
}
