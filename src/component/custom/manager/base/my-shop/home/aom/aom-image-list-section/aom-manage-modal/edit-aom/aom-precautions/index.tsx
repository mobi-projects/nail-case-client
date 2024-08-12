import NTIcon from "@/component/common/nt-icon"

export default function AOMPrecautions() {
	return (
		<div className="flex flex-col gap-y-2">
			<p className="pt-5 text-Title03 font-SemiBold"> 유의 사항 </p>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" />
				<NTIcon
					icon="delete"
					className="mr-1 h-4 w-4 rounded-full border-White bg-Gray70 text-PY80"
				/>
				아이콘을 클릭하면 등록된 사진을 삭제할 수 있어요.
			</div>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" />
				<NTIcon icon="camera" className="h-5 w-5 pr-1 text-PB100" />
				아이콘을 클릭하면 사진을 등록할 수 있어요.
			</div>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" /> 사진은 최대
				<span className="px-1 text-PB100"> 10장</span> 까지 등록 가능해요.
			</div>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" /> 사진을 성공적으로 등록하셨다면
				등록 완료 버튼을 눌러 사진을 업로드 해주세요.
			</div>
		</div>
	)
}
