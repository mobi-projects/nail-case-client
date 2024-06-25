"use client"

import { Icon } from "@iconify/react"
import type { HTMLAttributes } from "react"

import { cn } from "@/config/tailwind"

type TIconData = {
	icon: keyof typeof ICON_DATA
}
type NTIconPT = HTMLAttributes<HTMLElement> & TIconData

export default function NTIcon({ className, icon, ...props }: NTIconPT) {
	return (
		<div className="h-fit w-fit" {...props}>
			<Icon
				icon={ICON_DATA[icon]}
				className={cn(
					"m-0 inline-block h-[36px] w-[36px] p-0 text-[length:inherit] text-inherit",
					className,
				)}
			/>
		</div>
	)
}

export const ICON_DATA = {
	expandDownLight: "lets-icons:expand-down-light",
	expandUpLight: "lets-icons:expand-up-light",
	expandRightLight: "lets-icons:expand-right-light",
	expandRight: "lets-icons:expand-right",
	expandLeftLight: "lets-icons:expand-left-light",
	expandLeft: "lets-icons:expand-left",
	check: "material-symbols-light:check-rounded",
	checkRingLight: "lets-icons:check-ring-light",
	addRoundLight: "lets-icons:add-round-light",
	closeRoundLight: "lets-icons:close-round-light",
	commentLight: "lets-icons:comment-light",
	editLight: "lets-icons:edit-light",
	setting: "ep:setting",
	calendarLight: "lets-icons:calendar-light",
	homeLight: "lets-icons:home-light",
	creditCardLight: "lets-icons:credit-card-light",
	shopLight: "lets-icons:shop-light",
	favoriteLight: "lets-icons:favorite-light",
	deskAltLight: "lets-icons:desk-alt-light",
	sortArrowLight: "lets-icons:sort-arrow-light",
	timeLight: "lets-icons:time-light",
	messageLight: "lets-icons:message-light",
	darhboard: "lets-icons:darhboard",
	menu: "material-symbols-light:menu",
	infoLight: "lets-icons:info-light",
	bellLight: "lets-icons:bell-light",
	bloodLight: "lets-icons:blood-light",
	phoneLight: "lets-icons:phone-light",
	flagAltLight: "lets-icons:flag-alt-light",
	star: "lets-icons:star-light",
	starFull: "weui:star-filled",
	search: "iconamoon:search-thin",
	delete: "lets-icons:close-round",
	dot: "mdi:dot",
	pencil: "octicon:pencil-24",
	arrowUp: "ph:arrow-up",
} as const
