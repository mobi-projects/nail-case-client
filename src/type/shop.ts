/* Request */
export type TReqBodyPostRegisterShop = {
	shopData: {
		shopName: string
		address: string
		phone: string
		workHours: Array<{
			dayOfWeek: number
			isOpen: boolean
			openTime: number
			closeTime: number
		}>
	}
	profileImages: Array<string>
	priceImages: Array<string>
}
export type TReqBodyPatchUpdateOverview = Partial<{
	overview: string
	tagNames: Array<string>
}>
export type TReqBodyPutUpdateShop = {
	shopName: string
	phone: string
	availableSeats: number
}
export type TReqBodyPostUploadImage = {
	file: string
}

/* Response */
export type TResGetShopById = {
	createdAt: number
	modifiedAt: number
	shopId: number
	ownerId: string
	shopName: string
	phone: string
	overview: string
	address: string
	availableSeats: number
	shopAvgRatings: number
	tags: Array<string>
	images: [] // [TODO] 추후 수정, 타입 미확인
}
export type TResPostRegisterShop = {
	createdAt: number
	modifiedAt: number
	shopId: number
	ownerId: string | null
	shopName: string
	phone: string
	overview: string | null
	address: string
	availableSeats: number
	tags: Array<string> | null
	workHours: {
		closeTime: number
		dayOfWeek: number
		isOpen: boolean
		openTime: number
	}[]
	shopAvgRatings: number | null
	priceImages: { imageId: number; imageUrl: string }[]
	profileImages: { imageId: number; imageUrl: string }[]
}
export type TResGetSearchShop = {
	totalPages: number
	totalElements: number
	pageable: {
		paged: boolean
		pageNumber: number
		pageSize: number
		unpaged: boolean
		offset: number
		sort: Array<{
			direction: string
			nullHandling: string
			ascending: boolean
			property: string
			ignoreCase: boolean
		}>
	}
	first: boolean
	last: boolean
	size: number
	content: Array<{
		createdAt: number
		modifiedAt: number
		shopId: number
		ownerId: string
		shopName: string
		phone: string
		overview: string
		address: string
		availableSeats: number
		tags: Array<string>
		images: [] // [TODO] 추후 수정, 타입 미확인
	}>
	number: number
	sort: Array<{
		direction: string
		nullHandling: string
		ascending: boolean
		property: string
		ignoreCase: boolean
	}>
	numberOfElements: number
	empty: boolean
}
export type TResPatchUpdateOverview = {
	createdAt: number
	modifiedAt: number
	shopId: number
	ownerId: string
	shopName: string
	phone: string
	overview: string
	address: string
	availableSeats: number
	shopAvgRatings: number
	tags: Array<string>
	images: [] // [TODO] 추후 수정, 타입 미확인
}
export type TResPutUpdateShop = {
	createdAt: number
	modifiedAt: number
	shopId: number
	ownerId: string
	shopName: string
	phone: string
	overview: string
	address: string
	availableSeats: number
	tags: Array<string>
	images: [] // [TODO] 추후 수정, 타입 미확인
}
export type TResGetListShopNailArtist = {
	id: number
	nickname: string
	enable: boolean
	near: number
}
export type TResGetShopInfo = {
	createdAt: number
	modifiedAt: number
	shopId: number
	point: string
	parkingLotCnt: number
	availableCnt: number
	info: string
	price: string
	imageUrl: string
}
export type TReseGetWortHours = {
	workHourId: number
	dayOfWeek: number
	isOpen: boolean
	openTime: number
	closeTime: number
}
