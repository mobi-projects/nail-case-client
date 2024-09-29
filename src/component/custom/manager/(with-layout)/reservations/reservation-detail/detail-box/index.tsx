import NTIcon from "@/component/common/nt-icon"

type DeatailBoxPT = {
	content: string
	title: string
}

export default function DeatailBox({ content, title }: DeatailBoxPT) {
	return (
		<div className="w-full border-b border-Gray20">
			<p className="text-Body02 font-SemiBold text-Gray70">{title}</p>
			<div className="flex items-center">
				<NTIcon icon="dot" className="text-Gray30" />
				<p className="text-Body02 font-Bold text-PB90">{content}</p>
			</div>
		</div>
	)
}
