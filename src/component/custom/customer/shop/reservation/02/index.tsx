"use client"
import type { Dispatch, SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"

const MAX_COMPANION = 5

type CompanionPT = {
	companion: number
	setCompanion: Dispatch<SetStateAction<number>>
}
export default function Companion({ companion, setCompanion }: CompanionPT) {
	const companionOptionArr = createCompanionOptionArr(MAX_COMPANION)
	const onClickCompanionOption = (idx: number) => {
		setCompanion(idx + 1)
	}

	return (
		<NTOption
			className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
			selectedIdxArr={[companion - 1]}
			optionArr={companionOptionArr}
			onSelect={onClickCompanionOption}
			size="large"
		/>
	)
}

const createCompanionOptionArr = (maxCompanion: number) => {
	const companionOptionArr = ["1 인"]
	for (let i = 2; i <= maxCompanion; i++)
		companionOptionArr.push(`${i} 인 동반`)
	return companionOptionArr
}
