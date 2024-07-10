"use client"
import NTOption from "@/component/common/nt-option"

type CompanionPT = {
	maxCompanion: number
}
export default function Companion({ maxCompanion }: CompanionPT) {
	const companionOptionArr = createCompanionOptionArr(maxCompanion)
	return (
		<NTOption
			className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
			optionArr={companionOptionArr}
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
