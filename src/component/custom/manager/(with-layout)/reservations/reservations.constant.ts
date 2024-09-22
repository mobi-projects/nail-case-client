import type { TStatusExcludeCanceled } from "./reservations.type"

export const STATUS_WITHOUT_CANCELED_ARR: Array<TStatusExcludeCanceled> = [
	"PENDING",
	"CONFIRMED",
	"COMPLETED",
	"REJECTED",
]
