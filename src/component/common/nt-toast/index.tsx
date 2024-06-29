"use client"

import { useState } from "react"

import { NTButton } from "../atom/nt-button"

const ToastMessage = () => {
	const [isClicked, setIsClicked] = useState(false)
	const tag = ["케어", "사진 등록", "타샵 제거 필요"]
	const handleChange = () => {
		setIsClicked((prev) => !prev)
	}

	const handleButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	return (
		<div
			onClick={handleChange}
			className="h-fit w-[450px] rounded-[14px] bg-White px-[20px] py-[20px] drop-shadow-[2.48px_2.48px_12.41px_rgba(224,224,224,1)]"
		>
			<div className="flex items-center justify-between">
				<div className=" ">
					<p className="text-Headline02 text-PB100">
						새로운 예약이 등록되었습니다.
					</p>
					<p className="text-[16px] font-SemiBold text-Gray70">
						6월 27일 (목요일) 오후 1:00-2:00
					</p>
				</div>
				<NTButton onClick={handleButtonClick}>예약 확정</NTButton>
			</div>
			{isClicked && (
				<div className="flex items-center justify-between pt-[5px]">
					<div className="text-Body02 text-Gray70">{tag.join(", ")}</div>
					<NTButton variant="tertiary" onClick={handleButtonClick}>
						예약 관리
					</NTButton>
				</div>
			)}
		</div>
	)
}

export default ToastMessage
