import type { TOperating, TSpecialty, TUser } from "."

export type TShopGuide = {
	parking: number
	companion: number
	reservationDeadline: number
}

export type TShopInfo = {
	id: string
	address: string
	shopName: string
	overview: string
	todayAccess: number
	totalAccess: number
	phone: string
	hashtagArr: string[]
	snsArr: string[]
	srcArr: string[]
	owner: TUser
	specialty: TSpecialty
	guide: TShopGuide
	operatingTimeArr: TOperating[]
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
