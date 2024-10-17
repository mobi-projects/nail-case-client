export type TResGetShopInfo = {
	workHours: Array<TWorkHours>
	profileImages: Array<TInfoImages>
	shopName: string
	address: string
	priceImages: Array<TInfoImages>
}

export type TWorkHours = {
	closeTime: number
	openTime: number
	isOpen: boolean
	dayOfWeek: number
}

export type TInfoImages = { imageId: number; imageUrl: string }
