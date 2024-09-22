import type { Dispatch, SetStateAction } from "react"

import { STATUS_WITHOUT_CANCELED_ARR } from "../reservations.constant"

import CategoryBox from "./catagory-box"

type ReservationsHeaderPT = {
	clickedIdx: number
	setClickedIx: Dispatch<SetStateAction<number>>
}

export default function ReservationsHeader({
	clickedIdx,
	setClickedIx,
}: ReservationsHeaderPT) {
	return (
		<div className="mt-10 flex w-full items-center justify-between pb-8">
			{STATUS_WITHOUT_CANCELED_ARR.map((status, idx) => (
				<CategoryBox
					status={status}
					key={status}
					isClicked={clickedIdx === idx}
					setClickedIx={setClickedIx}
				/>
			))}
		</div>
	)
}
