export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopIds: null | Array<number>
	hasShop: boolean
	userType: "MEMBER" | "MANAGER"
	accessTokenExpirationTime: number
	refreshTokenExpirationTime: number
}

export type TRefreshDataResponse = { accessToken: string; refreshToken: string }
