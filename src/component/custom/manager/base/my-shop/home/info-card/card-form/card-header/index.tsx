import NTIcon from "@/component/common/nt-icon"

type CardHeaderPT = {
	title: string
	onClick?: () => void
}
export function CardHeader({ title, onClick }: CardHeaderPT) {
	return (
		<div className="mx-[25px] flex w-[232px] items-center justify-between border-b-[1.5px] border-Gray20 pb-[10px]">
			<div className="text-Headline02 text-Gray90">{title}</div>
			{onClick && (
				<NTIcon
					icon="expandRightLight"
					className="h-[24px] w-[24px] cursor-pointer"
					onClick={onClick}
				/>
			)}
		</div>
	)
}
