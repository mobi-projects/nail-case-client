import { COLORS, fontStyle, fontWeight } from "./src/config/tailwind"

const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				...COLORS,
			},
			fontSize: {
				...fontStyle,
			},
		},
		fontWeight: {
			...fontWeight,
		},
	},
	plugins: [],
}

export default config
