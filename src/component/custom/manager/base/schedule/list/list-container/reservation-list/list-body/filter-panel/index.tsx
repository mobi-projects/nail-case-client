import NTDateTime from "@/component/common/nt-date-time"

export default function FilterPanel() {
	return (
		<div className="flex h-fit w-full justify-end gap-2">
			<NTDateTime>전체</NTDateTime>
			<NTDateTime>오늘</NTDateTime>
		</div>
	)
}
