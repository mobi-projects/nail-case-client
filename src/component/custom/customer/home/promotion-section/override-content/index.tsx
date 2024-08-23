type OverrideContentPT = {
	title?: string
	description?: string
}

export default function OverrideContent({
	description,
	title,
}: OverrideContentPT) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="text-Title01 font-Bold text-White">{title}</div>
			<div className="text-Headline01 font-SemiBold text-White">
				{description}
			</div>
		</div>
	)
}
