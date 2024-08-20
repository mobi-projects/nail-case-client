export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopId: null | string
	hasShop: boolean
	profileImgUrl: string
	role: "MEMBER" | "MANAGER"
	accessTokenExpirationTime: number
	refreshTokenExpirationTime: number
}

export type TRefreshDataResponse = { accessToken: string; refreshToken: string }
