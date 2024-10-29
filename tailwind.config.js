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
				// 최대 639px 이하에서 적용 (max-sm)
				"max-sm": { max: "639px" },

				// 최대 767px 이하에서 적용 (max-md)
				"max-md": { max: "767px" },

				// 최대 1023px 이하에서 적용 (max-lg)
				"max-lg": { max: "1024px" },

				// 최대 1279px 이하에서 적용 (max-xl)
				"max-xl": { max: "1279px" },

				// 최대 1535px 이하에서 적용 (max-2xl)
				"max-2xl": { max: "1535px" },

				// md 구간: 640px 이상 767px 이하
				md: { min: "640px", max: "767px" },

				// lg 구간: 768px 이상 1023px 이하
				lg: { min: "768px", max: "1024px" },

				// xl 구간: 1024px 이상 1279px 이하
				xl: { min: "1025px", max: "1279px" },
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
				"@media (max-width: 767px)": {
					".text-Title01": {
						fontSize: "24px",
						lineHeight: "28px",
					},
					".text-Title02": {
						fontSize: "20px",
						lineHeight: "24px",
					},
					".text-Title03": {
						fontSize: "18px",
						lineHeight: "22px",
					},
					".text-Headline01": {
						fontSize: "16px",
						lineHeight: "22px",
					},
					".text-Headline02 ": {
						fontSize: "14px",
						lineHeight: "21px",
					},
					".text-Body02, .text-Body01": {
						fontSize: "12px",
						lineHeight: "18px",
					},
					".text-Callout": {
						fontSize: "10px",
						lineHeight: "16px",
					},
					".text-Caption01,.text-Caption02": {
						fontSize: "8px",
						lineHeight: "10px",
					},
				},
				"@media (min-width: 768px) and (max-width: 1024px)": {
					".text-Title01": {
						fontSize: "26px",
					},
					".text-Title02": {
						fontSize: "22px",
					},
					".text-Title03": {
						fontSize: "20px",
					},
					".text-Headline01": {
						fontSize: "18px",
					},
					".text-Headline02 ": {
						fontSize: "16px",
					},
					".text-Body02, .text-Body01": {
						fontSize: "14px",
					},
					".text-Callout": {
						fontSize: "12px",
					},
					".text-Caption01,.text-Caption02": {
						fontSize: "10px",
					},
				},
			})
		},
	],
}

export default config
