import NTOption from "@/component/common/nt-option"

type ExtensionConfirmPT = { extend: boolean }

export default function ExtensionConfirm({ extend }: ExtensionConfirmPT) {
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center border-b-[1px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">연장 유무</p>
			<NTOption
				optionArr={[extend ? "연장 필요" : "연장 필요 없음"]}
				optionClassName="font-Bold text-PB100"
			/>
		</div>
	)
}
