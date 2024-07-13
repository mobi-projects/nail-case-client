export type TResGetMainPageHaveToken = {
	recentReservation: null
	topPopularShops: Array<{
		shopId: number
		ownerId: string
		shopName: string
		address: string
		images: null
	}>
	likedShops: Array<{
		shopId: number
		ownerId: string
		shopName: string
		address: string
		images: null
	}>
}
export type TResShop = {
	shopId: number
	ownerId: string
	shopName: string
	address: string
	images: null
}
