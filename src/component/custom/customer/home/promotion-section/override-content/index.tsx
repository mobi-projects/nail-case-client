type OverrideContentPT = {
	title?: string
	description?: string
}

export default function OverrideContent({
	description,
	title,
}: OverrideContentPT) {
	return (
		<div className="flex h-full flex-col items-center justify-center max-md:min-w-5">
			<div className="text-Title01 font-Bold text-White lg:text-[18px] max-md:text-[14px]">
				{title}
			</div>
			<div className="text-Headline01 font-SemiBold text-White lg:text-[12px] max-md:text-[8px]">
				{description}
			</div>
		</div>
	)
}
