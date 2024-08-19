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
