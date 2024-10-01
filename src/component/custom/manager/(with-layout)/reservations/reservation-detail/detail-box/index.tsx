type DeatailBoxPT = {
	content: string
	title: string
}

export default function DeatailBox({ content, title }: DeatailBoxPT) {
	return (
		<div className="flex min-h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12">
			<p className="min-w-[5.5rem] text-Body02 font-SemiBold text-Gray80">
				{title}
			</p>
			<div className="text-Body02 font-SemiBold text-PB100">{content}</div>
		</div>
	)
}
