import { usePathname, useRouter } from "next/navigation"

import {
	NTPulldownContent,
	NTPulldownItem,
	NTPulldownLabel,
	NTPulldownTrigger,
	useNTPulldown,
} from "@/component/common/nt-pulldown"
import type { TResSubscribe } from "@/hook/use-sse"

import { getBasePath, getTimeDifference } from "./alarm-pulldown.util"

type AlarmPulldownPT = {
	message: Array<TResSubscribe>
}
export default function AlarmPulldown({ message }: AlarmPulldownPT) {
	const { setIsOpen } = useNTPulldown()
	const router = useRouter()
	const pathName = usePathname()
	const basePath = getBasePath(pathName)

	return (
		<>
			<NTPulldownTrigger
				hasArrow={false}
				className="absolute -right-2 -top-1 h-fit w-fit border-none bg-transparent"
			>
				<div className="h-2 w-2 animate-pulse rounded-full bg-PB110 transition-all duration-300" />
			</NTPulldownTrigger>
			<NTPulldownContent
				position="centerBottom"
				className="max-h-[300px] w-[260px]"
			>
				<NTPulldownLabel className="h-fit">
					<div
						className="flex h-full w-full cursor-pointer justify-end text-Callout text-Gray60 hover:underline"
						onClick={() => {
							router.push(`/${basePath}/reservations/notifications`)
							setIsOpen(false)
						}}
					>
						전체보기
					</div>
				</NTPulldownLabel>
				{message.map((info, idx) => {
					const content = info.content
					const firstThree = content.slice(0, 3) // 앞의 3글자
					const remaining = content.slice(3) // 나머지 글자

					return (
						<NTPulldownItem
							key={idx}
							className="w-full"
							onClick={() => {
								router.push(`/${basePath}/reservations/PENDING/1`)
								setIsOpen(false)
							}}
						>
							<div>
								<span>
									<span className="text-PB80">{firstThree}</span>
									<span className="text-Gray70">{remaining}</span>
								</span>
								<p className="w-full text-end text-Caption02 text-Gray50">
									({getTimeDifference(info.sendDateTime)})
								</p>
							</div>
						</NTPulldownItem>
					)
				})}
			</NTPulldownContent>
		</>
	)
}
