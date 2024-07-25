export type TShopGuide = {
	parking: number
	companion: number
	reservationDeadline: number
}

export type TNailShopInfo = {
	address: string
	availableSeats: number
	createdAt: number
	images: string | Array<string>
	modifiedAt: number
	overview: string
	ownerId: string
	phone: string
	shopId: number
	shopName: string
	tags: string[]
	shopAvgRatings: number
}
