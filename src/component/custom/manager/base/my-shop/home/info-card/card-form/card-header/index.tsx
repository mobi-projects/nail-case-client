import NTIcon from "@/component/common/nt-icon"

type CardHeaderPT = {
	title: string
}
export function CardHeader({ title }: CardHeaderPT) {
	return (
		<>
			<div className="flex w-[282px] items-center justify-between px-[25px] pb-[10px]">
				<div className="text-Headline02 text-Gray90">{title}</div>
				<NTIcon
					icon="expandRightLight"
					className="h-[24px] w-[24px] cursor-pointer"
				/>
			</div>
			<div className="mx-[25px] border-t-[1.5px] border-Gray20"></div>
		</>
	)
}
