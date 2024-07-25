export default function InstructionList() {
	return (
		<div className="flex h-fit w-full flex-col gap-[2px]">
			<li className="text-Callout text-Gray60">
				계정 당, 한 개 지점만 등록할 수 있습니다.
			</li>
			<li className="text-Callout text-Gray60">
				(<span className="text-[#FF2C45]">*</span>) 는 필수 작성 항목
				표식입니다.
			</li>
		</div>
	)
}
