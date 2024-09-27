import { usePathname, useRouter } from "next/navigation"

import Pagination from "@/component/common/nt-pagination"
import { useListReservation } from "@/hook/use-reservation-controller"
import { isUndefined } from "@/util/common/type-guard"

import { createDateRange } from "../../reservations,util"
import type { TStatusExcludeCanceled } from "../../reservations.type"

type PaginationControllerPT = {
	page: number
	shopId: number
	status: TStatusExcludeCanceled
}
export default function PaginationController({
	page,
	shopId,
	status,
}: PaginationControllerPT) {
	const router = useRouter()
	const pathName = usePathname()
	const { endDate, startDate } = createDateRange()
	const { data, isError, isLoading } = useListReservation({
		shopId,
		endDate,
		page,
		startDate,
		status,
	})
	const pathNameDeletedPage = pathName.split("/").slice(0, -1).join("/")

	if (isError || isLoading || isUndefined(data))
		return <div className="flex h-[63px] w-full bg-White py-4" />
	const { totalPages, reservationList } = data
	const onChangePage = (nxtPage: number) => {
		if (nxtPage > 0 || nxtPage < totalPages)
			router.push(`${pathNameDeletedPage}/${nxtPage}`)
	}
	return (
		reservationList.length > 0 && (
			<div className="flex h-[63px] w-full items-center justify-center py-4">
				<Pagination
					curPage={page + 1}
					totPage={totalPages}
					perPage={4}
					onChangePage={onChangePage}
					arrowClassName="h-6 w-6 text-Gray100"
				/>
			</div>
		)
	)
}
