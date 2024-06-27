"use client"

import React, { useEffect, useState } from "react"

import { NTButton } from "../atom/nt-button"

type NTToastPT = {
	duration?: number
	onClose: () => void
}

export const NTToast: React.FC<NTToastPT> = ({ duration = 1000, onClose }) => {
	const [extendedDuration, setExtendedDuration] = useState(duration)
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose()
		}, extendedDuration)

		return () => clearTimeout(timer)
	}, [extendedDuration, onClose])

	const handleClick = () => {
		setIsExpanded(true)
		setExtendedDuration((prevDuration) => prevDuration + 1000)
	}

	const handleButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const tag = ["2인 동반 시술", "타샵 제거 필요", "사진 등록"]

	return (
		<div
			onClick={handleClick}
			className={`fixed right-4 top-4 z-50 flex items-center justify-between rounded-[14px] border px-[24px] py-[16px] shadow-customGray60 transition-all duration-300 ${
				isExpanded ? "h-[148px] w-[485px]" : "h-[90px] w-[485px]"
			}`}
		>
			<div>
				<div>
					<p className="text-Headline02 text-PB100">
						새로운 예약이 등록되었습니다.
					</p>
					<p className="font-SemiBold text-Gray70">
						6월 27일 (목요일) 오후 1:00-2:00
					</p>
				</div>
				{isExpanded && (
					<div className="mt-[8px] grid grid-cols-3">
						{tag.map((item, idx) => (
							<div key={idx} className="text-Body02 text-Gray70">
								{item}
							</div>
						))}
					</div>
				)}
			</div>
			<div>
				<NTButton variant="primary" size="small" onClick={handleButtonClick}>
					예약 확정
				</NTButton>
				{isExpanded && (
					<div className="mt-[10px]">
						<NTButton
							variant="tertiary"
							size="small"
							onClick={handleButtonClick}
						>
							예약 관리
						</NTButton>
					</div>
				)}
			</div>
		</div>
	)
}
