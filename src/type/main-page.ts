export type TResShop = {
	shopId: number
	ownerId: string
	shopName: string
	address: string
	images: null
}

export type TResGetMainPageHaveToken = {
	recentReservation: null
	topPopularShops: Array<TResShop>
	likedShops: Array<TResShop>
}
