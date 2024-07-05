import type { Dispatch, ReactNode, SetStateAction } from "react"
import { createContext, useContext, useState } from "react"

import { getThisDate, getThisMonth, getThisYear } from "@/util/common"

type TimeInfoType = {
	year: number
	month: number
	day: number
}

type TimeInfoContextType = {
	timeInfo: TimeInfoType
	setTimeInfo: Dispatch<SetStateAction<TimeInfoType>>
}

const TimeInfoContext = createContext<TimeInfoContextType | undefined>(
	undefined,
)

type TimeInfoProviderPT = { children: ReactNode }

export function TimeInfoProvider({ children }: TimeInfoProviderPT) {
	const defaultTimeInfo: TimeInfoType = {
		year: getThisYear(),
		month: getThisMonth(),
		day: getThisDate(),
	}

	const [timeInfo, setTimeInfo] = useState<TimeInfoType>(defaultTimeInfo)

	return (
		<TimeInfoContext.Provider value={{ timeInfo, setTimeInfo }}>
			{children}
		</TimeInfoContext.Provider>
	)
}

export const useTimeInfo = () => {
	const context = useContext(TimeInfoContext)
	if (context === undefined) {
		throw new Error("useTimeInfo must be used within a TimeInfoProvider")
	}
	return context
}
