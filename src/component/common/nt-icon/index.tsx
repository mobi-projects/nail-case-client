"use client"

import { Icon } from "@iconify/react"
import type { HTMLAttributes } from "react"

import { cn } from "@/config/tailwind"

type TIconData = {
	icon: keyof typeof ICON_DATA
}
type NTIconPT = HTMLAttributes<HTMLElement> & TIconData

export default function NTIcon({ className, icon }: NTIconPT) {
	return (
		<Icon
			icon={ICON_DATA[icon]}
			className={cn(
				"m-0 inline-block h-[36px] w-[36px] p-0 text-[length:inherit] text-inherit",
				className,
			)}
		/>
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
	settingLineLight: "lets-icons:setting-line-light",
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
	search: "iconamoon:search-thin",
	dot: "mid:dot",
} as const
