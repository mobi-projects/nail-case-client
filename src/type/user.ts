import type { TOperating, TSchedule, TSpecialty } from "."

export type TUser = {
	id: number
	name: string
	email: string
	phone: string
}
export type TArtist = TUser & {
	specialty: TSpecialty
	workingTimeArr: TOperating[]
	scheduleArr: TSchedule[]
}
export type TCustomer = TUser

export type TUserInfo = {
	shopId: number | null
	shopName: string | null
	profileImage: string
	role: "MANAGER" | "MEMBER"
}
