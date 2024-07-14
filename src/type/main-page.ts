import type { TNailCondition } from "./union-option/nail-condition"
import type { TNailTreatment } from "./union-option/nail-treatment"
import type { TRemoveOption } from "./union-option/remove-option"
import type { TReservationStatus } from "./union-option/resesrvation-status"

export type TResShop = {
	id: number
	name: string
	overview: string
	likedByUser: boolean
}
export type TRecentReservation = {
	reservationId: number
	shop: {
		id: number
		name: string
	}
	details: Array<{
		reservationDetailsId: number
		startTime: number
		endTime: number
		treatmentOptions: Array<TNailTreatment>
		removeOption: TRemoveOption
		conditionOptions: Array<TNailCondition>
		accompanied: boolean
		status: TReservationStatus
	}>
}
export type TResGetMainPageHaveToken = {
	recentReservation: TRecentReservation
	topPopularShops: Array<TResShop>
	likedShops: Array<TResShop>
	max3RecentlyCompletedReservation: Array<{
		reservationId: number
		shop: {
			id: number
			name: string
			image: null
		}
		startTime: number
	}>
}
