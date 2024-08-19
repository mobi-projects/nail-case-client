type DigitalFormatPT = {
	title: string
	hour: string
	minute: string
	isOpen: boolean
}
export function DigitalFormat({
	title,
	hour,
	minute,
	isOpen = true,
}: DigitalFormatPT) {
	return (
		<span className="flex w-full justify-start gap-4 text-Body01">
			<p className="text-Gray60">{title}</p>
			{isOpen ? `${hour} : ${minute}` : "휴 무"}
		</span>
	)
}
