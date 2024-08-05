type hourFromPT = {
	title: string
	time: string | React.ReactNode
}
export function HourFrom({ title, time }: hourFromPT) {
	return (
		<span className="flex w-full justify-start gap-4 text-Body01">
			<p className="text-Gray60">{title}</p>
			{time}
		</span>
	)
}
