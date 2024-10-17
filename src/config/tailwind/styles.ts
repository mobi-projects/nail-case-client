export const COLORS = {
	Black: "#000000",
	Gray100: "#161616",
	Gray90: "#262626",
	Gray80: "#2E2E2E",
	Gray70: "#525252",
	Gray60: "#6F6F6F",
	Gray50: "#8D8D8D",
	Gray40: "#A8A8A8",
	Gray30: "#C6C6C6",
	Gray20: "#E0E0E0",
	Gray10: "#F4F4F4",
	Gray08: "#BDBDBD",
	White: "#FFFFFF",
	PB110: "#069AED",
	PB100: "#02ADF2",
	PB90: "#1BB5F3",
	PB80: "#35BDF5",
	PB70: "#4EC6F6",
	PB60: "#67CEF7",
	PB50: "#80D6F8",
	PY100: "#F1F953",
	PY90: "#F2FA64",
	PY80: "#F4FA75",
	PY70: "#F5FB87",
	PY60: "#F7FB98",
	PY50: "#F8FCA9",
	BGblue01: "#F6FAFC",
	BGblue02: "#EFFAFF",
	PURPLE50: "#7a87f9",
	PURPLE100: "#4c51bf",
	GREEN50: "#69C893",
} as const

export const fontWeight = {
	Light: 300,
	Regular: 400,
	Medium: 500,
	SemiBold: 600,
	Bold: 700,
} as const

export const fontStyle = {
	LargeTitle: [
		"36px",
		{
			fontWeight: 400,
			lineHeight: "40px",
		},
	],
	Title01: [
		"28px",
		{
			fontWeight: 600,
			lineHeight: "38px",
		},
	],

	Title02: [
		"24px",
		{
			fontWeight: 400,
			lineHeight: "34px",
		},
	],
	Title03: [
		"22px",
		{
			fontWeight: 400,
			lineHeight: "30px",
		},
	],
	Headline01: [
		"20px",
		{
			fontWeight: 700,
			lineHeight: "30px",
		},
	],
	Headline02: [
		"18px",
		{
			fontWeight: 600,
			lineHeight: "28px",
		},
	],
	Button: [
		"18px",
		{
			fontWeight: 600,
			lineHeight: "24px",
		},
	],
	Body01: [
		{
			fontWeight: 400,
			lineHeight: "24px",
		},
	],
	Body02: [
		"16px",
		{
			fontWeight: 400,
			lineHeight: "22px",
		},
	],
	Callout: [
		"14px",
		{
			fontWeight: 400,
			lineHeight: "20px",
		},
	],
	Caption01: [
		"12px",
		{
			fontWeight: 400,
			lineHeight: "18px",
		},
	],
	Caption02: [
		"12px",
		{
			fontWeight: 300,
			lineHeight: "16px",
		},
	],
} as const
export const BoxShadow = {
	customCardPB: "1px 1.7px 8.52px 0px rgba(128, 214, 248, 0.7)",
	customGray60: "2.99px 2.99px 14.34px 0 rgba(224, 224, 224, 0.6)",
	customGray70: "2.99px 2.99px 14.34px 0 rgba(224, 224, 224, 0.7)",
	customGray80: "2.99px 2.99px 13px 0 rgba(224, 224, 224, 0.8)",
	customGray: "1px 1.7px 8.52px 0px rgba(224, 224, 224)",
} as const
