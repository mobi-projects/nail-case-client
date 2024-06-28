/* Request */
export type TReqBodyPostRegisterShop = {
	shopName: string
	phone: string
	availableSeats: number
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
	tags: Array<string>
	images: [] // [TODO] 추후 수정, 타입 미확인
}
export type TResPostRegisterShop = {
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
