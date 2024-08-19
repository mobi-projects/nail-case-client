export const SHOP_PROFILE_FILE_SIZE = 1280 * 540 * 5
export const PRICE_LIST_FILE_SIZE = 540 * 675 * 5

/* 스키마 속성 */
export const SHOP_NAME = {
	key: "shopName",
	label: "매장 이름",
} as const
export const ADDRESS = {
	key: "address",
	label: "주소",
} as const
export const TELEPHONE = {
	key: "telephone",
	label: "전화번호",
} as const

/* File 업로드 시, 허용 포멧 */
export const ACCEPTED_IMAGE_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
] as const

export const DAY_OF_WEEKS_KOR = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토",
] as const

/* timestamp boundary */
export const MAXIMUM_TIMESTAMP = 1704121199 // kst 기준, 2024년 1월 1일 23시 59분 59초
export const MINIMUM_TIMESTAMP = 1704034800 // kst 기준, 2024년 1월 1일 00시 00분 00초
export const DEFAULT_TIMESTAMP = 1704078000 // kst 기준, 2024년 1월 1일 12시 00분 00초
