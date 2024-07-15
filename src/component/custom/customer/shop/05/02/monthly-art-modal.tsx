import React from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"

import type { TMonthlyArtItem } from "."

type MonthlyArtModalPT = {
	isOpen: boolean
	art: TMonthlyArtItem | null
	onClose: () => void
}

const formatTimeStamp = (createAt: number) => {
	const year = getYearFromStamp(createAt)
	const month = getMonthFromStamp(createAt)
	const date = getMonthFromStamp(createAt)
	return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
}

const MonthlyArtModal: React.FC<MonthlyArtModalPT> = ({
	isOpen,
	art,
	onClose,
}) => {
	if (!isOpen || !art) return null

	return (
		<div className="fixed inset-0 z-[50] flex items-center justify-center bg-Gray10 bg-opacity-35 drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]">
			<div className="w-1/2 rounded-lg bg-white p-[32px]">
				<h2 className="font-bold mb-4 text-2xl">{art.title}</h2>
				<p className="mb-[16px] text-sm">{formatTimeStamp(art.createdAt)}</p>
				<p className="mb-[16px]">{art.contents}</p>
				<NTButton onClick={onClose}>닫기</NTButton>
			</div>
		</div>
	)
}

export default MonthlyArtModal
