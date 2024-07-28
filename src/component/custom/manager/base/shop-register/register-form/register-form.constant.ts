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

export const ACCEPTED_IMAGE_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
] as const
