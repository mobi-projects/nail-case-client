import { COLORS, FONT_STYLES } from "./src/libs/tailwind-css/styles"

const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				...COLORS.COMMON,
				...COLORS.Blue,
				...COLORS.Yellow,
				...COLORS.BGblue,
			},
			fontSize: {
				largeTitle: [
					FONT_STYLES.largeTitle.size,
					{
						lineHeight: FONT_STYLES.largeTitle.leading,
						fontWeight: FONT_STYLES.largeTitle.weight,
					},
				],
				title01: [
					FONT_STYLES.title01.size,
					{
						lineHeight: FONT_STYLES.title01.leading,
						fontWeight: FONT_STYLES.title01.weight,
					},
				],
				title02: [
					FONT_STYLES.title02.size,
					{
						lineHeight: FONT_STYLES.title02.leading,
						fontWeight: FONT_STYLES.title02.weight,
					},
				],
				title03: [
					FONT_STYLES.title03.size,
					{
						lineHeight: FONT_STYLES.title03.leading,
						fontWeight: FONT_STYLES.title03.weight,
					},
				],
				headline01: [
					FONT_STYLES.headline01.size,
					{
						lineHeight: FONT_STYLES.headline01.leading,
						fontWeight: FONT_STYLES.headline01.weight,
					},
				],
				headline02: [
					FONT_STYLES.headline02.size,
					{
						lineHeight: FONT_STYLES.headline02.leading,
						fontWeight: FONT_STYLES.headline02.weight,
					},
				],
				button: [
					FONT_STYLES.button.size,
					{
						lineHeight: FONT_STYLES.button.leading,
						fontWeight: FONT_STYLES.button.weight,
					},
				],
				body01: [
					FONT_STYLES.body01.size,
					{
						lineHeight: FONT_STYLES.body01.leading,
						fontWeight: FONT_STYLES.body01.weight,
					},
				],
				body02: [
					FONT_STYLES.body02.size,
					{
						lineHeight: FONT_STYLES.body02.leading,
						fontWeight: FONT_STYLES.body02.weight,
					},
				],
				callout: [
					FONT_STYLES.callout.size,
					{
						lineHeight: FONT_STYLES.callout.leading,
						fontWeight: FONT_STYLES.callout.weight,
					},
				],
				caption01: [
					FONT_STYLES.caption01.size,
					{
						lineHeight: FONT_STYLES.caption01.leading,
						fontWeight: FONT_STYLES.caption01.weight,
					},
				],
				caption02: [
					FONT_STYLES.caption02.size,
					{
						lineHeight: FONT_STYLES.caption02.leading,
						fontWeight: FONT_STYLES.caption02.weight,
					},
				],
			},
		},
	},
	plugins: [],
}

export default config
