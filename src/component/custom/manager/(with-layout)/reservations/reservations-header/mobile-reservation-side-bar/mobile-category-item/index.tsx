import { cva } from "class-variance-authority"
import { usePathname, useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { MANAGER_BASE, MANAGER_RESERVATIONS } from "@/constant/routing-path"

import { translateStatus } from "../../../reservations,util"
import type { TStatusExcludeCanceled } from "../../../reservations.type"
import { getLowerCasedStatus } from "../../catagory-box"

type MoblieCatagoryItemPT = {
	status: TStatusExcludeCanceled
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function MoblieCategoryItem({
	setIsOpen,
	status,
}: MoblieCatagoryItemPT) {
	const icon = getLowerCasedStatus(status)
	const router = useRouter()
	const pathName = usePathname()
	const shopId = pathName.split("/")[2]
	return (
		<div
			className={cn(
				"flex h-24 w-full items-center gap-x-4 border-b border-b-Gray20 px-4 transition-all",
			)}
			onClick={() => {
				router.push(
					`${MANAGER_BASE}/${shopId}${MANAGER_RESERVATIONS}/${status}/1`,
				)
				setIsOpen(false)
			}}
		>
			<NTIcon icon={icon} className={cn(iconVarinats({ textColor: status }))} />
			<div className={cn(titleVarinats({ textColor: status }))}>
				{translateStatus(status)}
			</div>
		</div>
	)
}

const titleVarinats = cva("text-Body01 font-Bold transition-all ", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-PURPLE50",
			COMPLETED: "text-GREEN50",
		},
	},
})
const iconVarinats = cva("h-8 w-8 transition-all", {
	variants: {
		textColor: {
			PENDING: "text-PB70",
			REJECTED: "text-red-300",
			CONFIRMED: "text-PURPLE50",
			COMPLETED: "text-GREEN50",
		},
	},
})
