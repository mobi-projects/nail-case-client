type DetailInfoPT = {
	title: string
	info: string
}
export default function DetailInfo({ title, info }: DetailInfoPT) {
	return (
		<div className="grid h-fit w-full grid-cols-[auto_2px_1fr] items-center justify-start">
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-White">
				{title}
			</div>
			<div className="h-[13px] w-full bg-Gray70" />
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-PB100">
				{info}
			</div>
		</div>
	)
}
