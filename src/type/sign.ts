export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopIds: null | Array<number>
	hasShop: boolean
	userType: "MEMBER" | "MANAGER"
	accessTokenExpirationTime: number
	refreshTokenExpirationTime: number
}
