import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

type InfoCardPT = {
	title: string
	content: string | Array<string>
	showDot?: boolean
	isClickable?: boolean
	onClick?: () => void
	isContentClickable?: boolean
	contentOnClick?: () => void
}
export default function InfoCard({
	title,
	content,
	showDot = false,
	isClickable = false,
	onClick,
	isContentClickable = false,
	contentOnClick,
}: InfoCardPT) {
	return (
		<div className="flex h-44 w-72 flex-col justify-start rounded-[26px] py-2 pr-5 shadow-customGray70 max-md:h-36 max-md:w-64">
			<div className="flex items-center justify-between pl-6">
				<div className="h-fit w-full py-2 text-Headline02">{title}</div>
				{isClickable && (
					<NTIcon
						icon="expandRightLight"
						className="w-8 cursor-pointer text-Gray40 hover:text-Black max-md:h-6 max-md:w-6"
						onClick={onClick}
					/>
				)}
			</div>
			<hr className="mb-1 ml-5 border" />
			<div className="flex w-full flex-col pl-4">
				{Array.isArray(content) ? (
					content.map((text, idx) => (
						<div key={idx} className="flex items-start">
							{showDot && (
								<NTIcon icon="dot" className="mr-[-0.5rem] text-Gray40" />
							)}
							<div className="whitespace-pre-line break-keep pl-2 pt-[0.375rem] text-Body01">
								{text}
							</div>
						</div>
					))
				) : (
					<div className="flex items-start">
						{showDot && (
							<NTIcon icon="dot" className="mr-[-0.5rem] text-Gray40" />
						)}
						<div
							className={cn(
								"whitespace-pre-line break-keep pl-2 pt-[0.375rem] text-Body01",
								isContentClickable && "hover:cursor-pointer hover:underline",
							)}
							onClick={contentOnClick}
						>
							{content}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
