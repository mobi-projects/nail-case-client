import type { TOperating, TSchedule, TSpecialty } from "."

export type TUser = {
	id: string
	name: string
	email: string
	phone: string
	scheduleArr: TSchedule[]
}
export type TArtist = TUser & {
	specialty: TSpecialty
	workingTimeArr: TOperating[]
}
export type TCustomer = TUser
