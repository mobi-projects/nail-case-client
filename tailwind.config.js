import { BoxShadow, COLORS, fontStyle, fontWeight } from "./src/config/tailwind"

const config = {
	mode: "jit",
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundColor: ["group-disabled"],
			colors: {
				...COLORS,
			},
			fontSize: {
				...fontStyle,
			},
			boxShadow: {
				...BoxShadow,
			},
		},
		fontWeight: {
			...fontWeight,
		},
	},
	plugins: [
		function ({ addVariant, e }) {
			addVariant("group-disabled", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.group:disabled .${e(`group-disabled${separator}${className}`)}`
				})
			})
		},
	],
}

export default config
