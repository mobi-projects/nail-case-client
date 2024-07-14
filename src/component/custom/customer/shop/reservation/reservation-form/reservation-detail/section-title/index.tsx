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
			<p className="text-Headline02 text-Gray80">{title}</p>
			{isEssential && (
				<div className="aspect-square h-[4px] self-start rounded-full bg-PB100" />
			)}
			{additionalNotice && (
				<p className="self-center text-Caption02 text-Gray40">
					{additionalNotice}
				</p>
			)}
		</div>
	)
}
