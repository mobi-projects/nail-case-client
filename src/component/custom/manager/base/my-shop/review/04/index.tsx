"use client"
import Pagination from "@/component/common/nt-pagination"

export default function ReviewPagination() {
	return (
		<div className="mt-[35px] flex w-full justify-center">
			<Pagination curPage={1} totPage={6} perPage={5} />
		</div>
	)
}
