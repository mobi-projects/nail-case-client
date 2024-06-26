import type { Meta, StoryObj } from "@storybook/react"

import { ICON_DATA } from "../../nt-icon"

import { NTButton } from "."

const meta: Meta<typeof NTButton> = {
	title: "component/common/nt-button",
	parameters: {
		layout: "centered",
	},
	component: NTButton,
	argTypes: {
		flexible: {
			description:
				"fit 일 경우, 버튼의 너비를 텍스트 길이에 맞춥니다. \n full 일 경우, 부모 너비에 맞춥니다.",
			control: "inline-radio",
			options: ["none", "fit", "full"],
		},
		variant: {
			control: "inline-radio",
			options: ["primary", "secondary", "tertiary"],
		},
		size: {
			control: "inline-radio",
			options: ["large", "medium", "small"],
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

type Story = StoryObj<typeof NTButton>

export const Default: Story = {
	args: {
		flexible: "none",
	},

	render: (props) => {
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>버튼 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<div className="flex h-[100px] w-full items-center justify-center">
					<NTButton {...props}>{props.children}</NTButton>
				</div>
			</div>
		)
	},
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
