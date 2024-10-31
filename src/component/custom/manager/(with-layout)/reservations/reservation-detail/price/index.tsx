import type { TResViewReservation } from "@/util/api/get-reservation-detail"

type PriceePT = {
	reservation: TResViewReservation
}
export default function Price({ reservation }: PriceePT) {
	const price = reservation.price
	const estimatedPrice = parseInt(price as string).toLocaleString()

	return (
		<div className="flex min-h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12 max-md:pl-4">
			<p className="min-w-[5.5rem] text-Body02 font-Bold text-PURPLE100 max-md:min-w-[4rem]">
				시술 가격
			</p>
			<div className="line-clamp-2 text-Body02 font-Bold">
				{estimatedPrice} 원
			</div>
		</div>
	)
}
