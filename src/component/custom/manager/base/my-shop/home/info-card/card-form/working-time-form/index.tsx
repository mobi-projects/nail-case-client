import NTIcon from "@/component/common/nt-icon"

export function WorkingTime() {
	return (
		<div className="px-[13px]">
			<div className="list-disc">
				<div className="flex items-center">
					<NTIcon icon="dot" className="text-Gray60" /> 기본가격
				</div>

				<span className="cursor-pointer hover:text-Gray60 hover:underline">
					가격표 이미지로 보기
				</span>
			</div>
		</div>
	)
}
