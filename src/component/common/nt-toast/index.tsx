import { useState } from "react"

import { NTButton } from "../atom/nt-button"

type ToastMessagePT = {
	title: string
	time: string
	tags: string[]
}

export const ToastMessage: React.FC<ToastMessagePT> = ({
	title,
	time,
	tags,
}) => {
	const [isClicked, setIsClicked] = useState(false)

	const handleChange = () => {
		setIsClicked((prev) => !prev)
	}

	const handleButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	return (
		<div
			onClick={handleChange}
			className="h-fit w-[450px] rounded-[14px] bg-White px-[20px] py-[20px] shadow-customGray60"
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-Headline02 text-PB100">{title}</p>
					<p className="text-[16px] font-SemiBold text-Gray70">{time}</p>
				</div>
				<NTButton onClick={handleButtonClick}>예약 확정</NTButton>
			</div>
			{isClicked && (
				<div className="flex items-center justify-between pt-[5px]">
					<div className="text-Body02 text-Gray70">{tags.join(", ")}</div>
					<NTButton variant="tertiary" onClick={handleButtonClick}>
						예약 관리
					</NTButton>
				</div>
			)}
		</div>
	)
}
