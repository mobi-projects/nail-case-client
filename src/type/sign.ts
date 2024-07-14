export type TSignDataResponse = {
	accessToken: string
	refreshToken: string
	shopIds: null | Array<number>
	hasShop: boolean
	role: "MEMBER" | "MANAGER"
	accessTokenExpirationTime: number
	refreshTokenExpirationTime: number
}
