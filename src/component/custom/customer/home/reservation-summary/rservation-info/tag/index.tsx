type TagPT = {
	option: string
}
export default function Tag({ option }: TagPT) {
	return (
		<div className="h-fit w-fit rounded-xl bg-PB50/20 px-4 py-2">
			<p className="text-Body01 font-SemiBold text-Gray70">{option}</p>
		</div>
	)
}
