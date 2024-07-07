import NTToolbar from "@/component/common/nt-toolbar"

export default function CommonHomeToolbar() {
	return (
		<div className="flex h-fit w-full flex-col items-center justify-center border-b-[1px] border-b-Gray10">
			<NTToolbar
				className="w-full justify-center gap-10"
				toolList={["네일샵", "헤어샵", "메이크업", "스타일링"]}
				position="bottom"
				focusedIdx={0}
			/>
		</div>
	)
}
