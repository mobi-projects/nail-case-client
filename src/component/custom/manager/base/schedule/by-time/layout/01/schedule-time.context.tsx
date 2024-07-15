// import type { Dispatch, ReactNode, SetStateAction } from "react"
// import { createContext, useContext, useState } from "react"

// import { getThisDate, getThisMonth, getThisYear } from "@/util/common"

// type TTimeInfo = {
// 	year: number
// 	month: number
// 	day: number
// }

// type TTimeInfoContext = {
// 	timeInfo: TTimeInfo
// 	setTimeInfo: Dispatch<SetStateAction<TTimeInfo>>
// }

// const TimeInfoContext = createContext<TTimeInfoContext | undefined>(undefined)

// type TimeInfoProviderPT = { children: ReactNode }

// export function TimeInfoProvider({ children }: TimeInfoProviderPT) {
// 	const defaultTimeInfo: TTimeInfo = {
// 		year: getThisYear(),
// 		month: getThisMonth(),
// 		day: getThisDate(),
// 	}

// 	const [timeInfo, setTimeInfo] = useState<TTimeInfo>(defaultTimeInfo)

// 	return (
// 		<TimeInfoContext.Provider value={{ timeInfo, setTimeInfo }}>
// 			{children}
// 		</TimeInfoContext.Provider>
// 	)
// }

// export const useTimeInfo = () => {
// 	const context = useContext(TimeInfoContext)
// 	if (context === undefined) {
// 		throw new Error("useTimeInfo must be used within a TimeInfoProvider")
// 	}
// 	return context
// }
