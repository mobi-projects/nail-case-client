import type { TNTTime } from "."
export type TSchedule = {
	id: number
	reservationId: number
	startTime: TNTTime
	endTime: TNTTime
}
