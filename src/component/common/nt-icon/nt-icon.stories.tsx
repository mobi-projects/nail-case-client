import type { Meta, StoryObj } from "@storybook/react"

import NTIcon from "."

const meta: Meta<typeof NTIcon> = {
	title: "component/common/nt-icon",
	parameters: {
		layout: "centered",
	},
	component: NTIcon,
	argTypes: {
		icon: {
			control: "inline-radio",
			options: [
				"expandDownLight",
				"expandUpLight",
				"expandRightLight",
				"expandLeftLight",
				"check",
				"checkRingLight",
				"addRoundLight",
				"closeRoundLight",
				"commentLight",
				"editLight",
				"settingLineLight",
				"calendarLight",
				"homeLight",
				"creditCardLight",
				"shopLight",
				"favoriteLight",
				"deskAltLight",
				"sortArrowLight",
				"timeLight",
				"messageLight",
				"darhboard",
				"menu",
				"infoLight",
				"bellLight",
				"bloodLight",
				"phoneLight",
				"flagAltLight",
				"star",
				"serach",
			],
		},
	},
}

export default meta

type Story = StoryObj<typeof NTIcon>

export const ExpandDownLight: Story = {
	args: {
		icon: "expandDownLight",
	},
}
export const ExpandUpLight: Story = {
	args: {
		icon: "expandUpLight",
	},
}
export const ExpandRightLight: Story = {
	args: {
		icon: "expandRightLight",
	},
}
export const ExpandLeftLight: Story = {
	args: {
		icon: "expandLeftLight",
	},
}
export const Check: Story = {
	args: {
		icon: "check",
	},
}
export const CheckRingLight: Story = {
	args: {
		icon: "checkRingLight",
	},
}
export const AddRoundLight: Story = {
	args: {
		icon: "addRoundLight",
	},
}
export const CloseRoundLight: Story = {
	args: {
		icon: "closeRoundLight",
	},
}
export const CommentLight: Story = {
	args: {
		icon: "commentLight",
	},
}
export const EditLight: Story = {
	args: {
		icon: "editLight",
	},
}
export const SettingLineLight: Story = {
	args: {
		icon: "settingLineLight",
	},
}
export const CalendarLight: Story = {
	args: {
		icon: "calendarLight",
	},
}
export const HomeLight: Story = {
	args: {
		icon: "homeLight",
	},
}
export const CreditCardLight: Story = {
	args: {
		icon: "creditCardLight",
	},
}
export const ShopLight: Story = {
	args: {
		icon: "shopLight",
	},
}
export const FavoriteLight: Story = {
	args: {
		icon: "favoriteLight",
	},
}
export const DeskAltLight: Story = {
	args: {
		icon: "deskAltLight",
	},
}
export const SortArrowLight: Story = {
	args: {
		icon: "sortArrowLight",
	},
}
export const TimeLight: Story = {
	args: {
		icon: "timeLight",
	},
}
export const MessageLight: Story = {
	args: {
		icon: "messageLight",
	},
}
export const Darhboard: Story = {
	args: {
		icon: "darhboard",
	},
}
export const Menu: Story = {
	args: {
		icon: "menu",
	},
}
export const InfoLight: Story = {
	args: {
		icon: "infoLight",
	},
}
export const BloodLight: Story = {
	args: {
		icon: "bloodLight",
	},
}
export const PhoneLight: Story = {
	args: {
		icon: "phoneLight",
	},
}
export const FlagAltLight: Story = {
	args: {
		icon: "flagAltLight",
	},
}
export const Star: Story = {
	args: {
		icon: "star",
	},
}
export const Search: Story = {
	args: {
		icon: "search",
	},
}
