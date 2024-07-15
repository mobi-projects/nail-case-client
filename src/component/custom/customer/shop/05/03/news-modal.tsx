import React from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"

import type { TShopNewsItem } from "."

type ShopNewsModalPT = {
	isOpen: boolean
	news: TShopNewsItem | null
	onClose: () => void
}

const formatTimeStamp = (createAt: number) => {
	const year = getYearFromStamp(createAt)
	const month = getMonthFromStamp(createAt)
	const date = getMonthFromStamp(createAt)
	return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
}

const ShopNewsModal: React.FC<ShopNewsModalPT> = ({
	isOpen,
	news,
	onClose,
}) => {
	if (!isOpen || !news) return null

	return (
		<div className="fixed inset-0 z-[50] flex items-center justify-center bg-Gray10 bg-opacity-35 drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]">
			<div className="w-1/2 rounded-lg bg-white p-[32px]">
				<h2 className="font-bold mb-[16px] text-2xl">{news.title}</h2>
				<p className="mb-[16px] text-sm">{formatTimeStamp(news.createdAt)}</p>
				<p className="mb-[16px]">{news.contents}</p>
				<NTButton onClick={onClose}>닫기</NTButton>
			</div>
		</div>
	)
}

export default ShopNewsModal
