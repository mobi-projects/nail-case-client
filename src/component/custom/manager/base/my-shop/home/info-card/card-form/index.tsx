import { CardHeader } from "./card-header"
type CardContainerProps = {
	title: string
	children: React.ReactNode
	onClick?: () => void
}

export function CardForm({ title, children, onClick }: CardContainerProps) {
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] py-[15px] shadow-customGray80">
			<CardHeader title={title} onClick={onClick} />
			{children}
		</div>
	)
}
