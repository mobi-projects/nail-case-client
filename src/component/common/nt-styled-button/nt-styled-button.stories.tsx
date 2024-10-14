import type { Meta, StoryObj } from "@storybook/react"

import { ICON_DATA } from "../nt-icon"

import { NTStyledButton } from "."

const meta: Meta<typeof NTStyledButton> = {
	title: "component/common/NTBorderButton",
	component: NTStyledButton,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		flexible: {
			description:
				"버튼의 너비를 설정합니다. 'fit'일 경우 텍스트 길이에 맞춰지고, 'full'일 경우 부모 너비에 맞춰집니다.",
			control: "inline-radio",
			options: ["none", "fit", "full"],
		},
		variant: {
			control: "inline-radio",
			options: ["primary", "secondary", "tertiary", "alert"],
		},
		size: {
			control: "inline-radio",
			options: ["large", "medium", "small", "exSmall"],
		},
		disabled: {
			control: "boolean",
		},
		children: {
			control: { type: "text" },
		},
		icon: {
			control: "inline-radio",
			options: [undefined, ...Object.keys(ICON_DATA)],
		},
	},
	args: {
		children: "Newtips",
	},
}

export default meta
type Story = StoryObj<typeof NTStyledButton>

export const Default: Story = {
	args: {
		flexible: "none",
	},
	render: (props) => (
		<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
			<h1>버튼 실험장</h1>
			<p>패널로 조작 해보세요.!</p>
			<div className="flex h-[100px] w-full items-center justify-center">
				<NTStyledButton {...props}>{props.children}</NTStyledButton>
			</div>
		</div>
	),
}

export const Primary: Story = {
	args: {
		variant: "primary",
		size: "large",
		children: "Button",
		icon: "check",
	},
}

export const Secondary: Story = {
	args: {
		variant: "secondary",
		size: "medium",
		children: "Button",
		icon: "check",
	},
}

export const Tertiary: Story = {
	args: {
		variant: "tertiary",
		size: "small",
		children: "Button",
		icon: "check",
	},
}
