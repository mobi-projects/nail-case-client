export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopIds: Array<number | null>
	hasShop: boolean
	profileImgUrl: string
	role: "MEMBER" | "MANAGER"
	accessTokenExpirationTime: number
	refreshTokenExpirationTime: number
}

export type TRefreshDataResponse = { accessToken: string; refreshToken: string }
