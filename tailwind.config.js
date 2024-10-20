import { BoxShadow, COLORS, fontStyle, fontWeight } from "./src/config/tailwind"

const config = {
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
			screens: {
				// 기본 breakpoints에 max- 버전을 추가
				"max-sm": { max: "639px" }, // sm 이하에서 적용
				"max-md": { max: "767px" }, // md 이하에서 적용
				"max-lg": { max: "1023px" }, // lg 이하에서 적용
				"max-xl": { max: "1279px" }, // xl 이하에서 적용
				"max-2xl": { max: "1535px" }, // 2xl 이하에서 적용
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
		// 커스텀 CSS를 추가하는 플러그인
		function ({ addUtilities }) {
			addUtilities({
				"@media (max-width: 640px)": {
					".text-Title01": {
						fontSize: "24px",
					},
					".text-Title02": {
						fontSize: "20px",
					},
					".text-Title03": {
						fontSize: "18px",
					},
					".text-Headline01": {
						fontSize: "16px",
					},
					".text-Headline02 ": {
						fontSize: "14px",
					},
					".text-Body02, .text-Body01": {
						fontSize: "12px",
					},
					".text-Callout": {
						fontSize: "10px",
					},
					".text-Caption01,.text-Caption02": {
						fontSize: "8px",
					},
				},
			})
		},
	],
}

export default config
