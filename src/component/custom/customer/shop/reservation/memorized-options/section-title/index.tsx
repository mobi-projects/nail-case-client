import NTHoverCard from "@/component/common/nt-hover-card"

type SectionTitlePT = {
	title: string
	isEssential?: boolean
	additionalNotice?: string
}

export default function SectionTitle({
	title,
	isEssential = false,
	additionalNotice,
}: SectionTitlePT) {
	return (
		<div className="flex h-fit w-full gap-[1px]">
			<p className="text-Headline02 text-Gray80 lg:text-[14px] max-md:text-[12px]">
				{title}
			</p>
			{isEssential && (
				<NTHoverCard
					contants="필수 입력사항 입니다."
					className="w-[170px] text-PB70 ring-1 ring-PB50"
				>
					<div className="aspect-square h-[4px] self-start rounded-full bg-PB100" />
				</NTHoverCard>
			)}
			{additionalNotice && (
				<p className="self-center text-Caption02 text-Gray40">
					{additionalNotice}
				</p>
			)}
		</div>
	)
}
