import { useState } from "react"

import Pagination from "@/component/common/nt-pagination"

export default function PaginationController() {
	const [curPage, setCurPage] = useState(1)
	const onChangePage = (nxtPage: number) => {
		setCurPage(nxtPage)
	}
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Pagination
				curPage={curPage}
				totPage={10}
				perPage={4}
				onChangePage={onChangePage}
				arrowClassName="h-6 w-6 text-Gray100"
			/>
		</div>
	)
}
