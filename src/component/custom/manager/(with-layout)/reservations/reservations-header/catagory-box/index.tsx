import { cva } from "class-variance-authority"
import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { Tstatus } from "@/util/api-v2/get-main-page-data"

import { STATUS_WITHOUT_CANCELED_ARR } from "../../reservations.constant"
import type { TStatusExcludeCanceled } from "../../reservations.type"

type CategoryBoxPT = {
	status: TStatusExcludeCanceled
	isClicked: boolean
	setClickedIx: Dispatch<SetStateAction<number>>
}

const titleVarinats = cva("text-Title02 font-Bold transition-all ", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-[#7a87f9]",
			COMPLETED: "text-[#69C893]",
		},
	},
})
const iconVarinats = cva("h-10 w-10 transition-all", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-[#7a87f9]",
			COMPLETED: "text-[#69C893]",
		},
	},
})

export default function CategoryBox({
	status,
	isClicked,
	setClickedIx,
}: CategoryBoxPT) {
	const icon = getLowerCasedStatus(status)
	return (
		<div
			className={cn(
				"flex h-24 w-64 cursor-pointer items-center justify-between gap-x-4 rounded-md bg-White px-4 shadow-customGray80 transition-all",
				isClicked && status === "PENDING" && "bg-PB70",
				isClicked && status === "REJECTED" && "bg-red-300",
				isClicked && status === "CONFIRMED" && "bg-[#7a87f9]",
				isClicked && status === "COMPLETED" && "bg-[#69C893]",
				!isClicked && "hover:bg-Gray10",
			)}
			onClick={() =>
				setClickedIx(
					STATUS_WITHOUT_CANCELED_ARR.findIndex(
						(element) => element === status,
					),
				)
			}
		>
			<div
				className={cn(
					titleVarinats({ textColor: status }),
					isClicked && "text-White",
				)}
			>
				{getBoxTitle(status)}
			</div>
			<div className="h-fit w-fit rounded-full bg-White/20 p-2">
				<NTIcon
					icon={icon}
					className={cn(
						iconVarinats({ textColor: status }),
						isClicked && "text-White",
					)}
				/>
			</div>
		</div>
	)
}

const getBoxTitle = (status: Exclude<Tstatus, "CANCELED">) => STATUS[status]

const getLowerCasedStatus = (
	status: TStatusExcludeCanceled,
): "rejected" | "completed" | "pending" | "confirmed" => {
	const lowerCaseStatus = status.toLowerCase() as
		| "rejected"
		| "completed"
		| "pending"
		| "confirmed"
	return lowerCaseStatus
}
const STATUS = {
	PENDING: "예약 요청",
	COMPLETED: "시술 완료",
	REJECTED: "취소된 요청",
	CONFIRMED: "예약 확정",
}
