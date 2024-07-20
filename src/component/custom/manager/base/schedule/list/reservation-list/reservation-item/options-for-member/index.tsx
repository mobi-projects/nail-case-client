import NTOption from "@/component/common/nt-option"
import { cn } from "@/config/tailwind"

type OptionContentsPT = {
	isSummary: boolean
	nicknameArr: string[]
	optionArr: string[][]
}
export default function OptionContents({
	isSummary,
	nicknameArr,
	optionArr,
}: OptionContentsPT) {
	const printingCount = isSummary ? 1 : nicknameArr.length
	return (
		<div className="flex h-full w-full flex-col">
			{Array.from({ length: printingCount }).map((_, idx) => (
				<div
					className={cn(
						"grid grid-cols-[70px_1fr] gap-[20px] border-b-[2px] border-transparent pb-[25px] pt-[15px]",
						idx !== printingCount - 1 && "border-Gray10",
					)}
					key={idx}
				>
					<div className="flex flex-col items-center gap-[4px]">
						<p className="break-all text-Headline01 text-Gray90">
							{nicknameArr[idx]}
						</p>
					</div>
					<NTOption optionArr={optionArr[idx]} size="large" />
				</div>
			))}
		</div>
	)
}
