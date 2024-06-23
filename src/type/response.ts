type TCommonResponse = {
	success: boolean
	code: number
	message: string
}
export type TResponseData<T, K extends string> = TCommonResponse & {
	[key in K]: T
}
