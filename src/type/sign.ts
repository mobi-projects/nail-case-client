export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopIds: Array<number | null>
	hasShop: boolean
	profileImgUrl: string
	role: "MEMBER" | "MANAGER"
}

export type TRefreshDataResponse = { accessToken: string; refreshToken: string }
