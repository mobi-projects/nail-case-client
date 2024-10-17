import { cva } from "class-variance-authority"
import { usePathname, useRouter } from "next/navigation"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { MANAGER_BASE, MANAGER_RESERVATIONS } from "@/constant/routing-path"

import { translateStatus } from "../../reservations,util"
import type { TStatusExcludeCanceled } from "../../reservations.type"

type CategoryBoxPT = {
	status: TStatusExcludeCanceled
	isClicked: boolean
}

const titleVarinats = cva("text-Title02 font-Bold transition-all ", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-PURPLE",
			COMPLETED: "text-GREEN",
		},
	},
})
const iconVarinats = cva("h-10 w-10 transition-all", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-PURPLE",
			COMPLETED: "text-GREEN",
		},
	},
})

export default function CategoryBox({ status, isClicked }: CategoryBoxPT) {
	const icon = getLowerCasedStatus(status)
	const router = useRouter()
	const pathName = usePathname()
	const shopId = pathName.split("/")[2]
	return (
		<div
			className={cn(
				"flex h-24 w-64 cursor-pointer items-center justify-between gap-x-4 rounded-md bg-White px-4 shadow-customGray80 transition-all",
				isClicked && status === "PENDING" && "bg-PB70",
				isClicked && status === "REJECTED" && "bg-red-300",
				isClicked && status === "CONFIRMED" && "bg-PURPLE",
				isClicked && status === "COMPLETED" && "bg-GREEN",
				!isClicked && "hover:bg-Gray10",
			)}
			onClick={() =>
				router.push(
					`${MANAGER_BASE}/${shopId}${MANAGER_RESERVATIONS}/${status}/1`,
				)
			}
		>
			<div
				className={cn(
					titleVarinats({ textColor: status }),
					isClicked && "text-White",
				)}
			>
				{translateStatus(status)}
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
