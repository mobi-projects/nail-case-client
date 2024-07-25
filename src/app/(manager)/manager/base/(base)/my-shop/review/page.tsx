import ReviewTotalGrade from "@/component/custom/manager/base/my-shop/review/01"
import ReviewTitleheader from "@/component/custom/manager/base/my-shop/review/02"
import ReviewList from "@/component/custom/manager/base/my-shop/review/03"
import ReviewPagination from "@/component/custom/manager/base/my-shop/review/04"

export default function Review() {
	return (
		<div className="flex w-full flex-col gap-[18px]">
			<ReviewTotalGrade />
			<div className="mt-[24px] flex h-[72px] w-full flex-col justify-between">
				<hr className="border-t-[1.5px] border-Gray20" />
				<ReviewTitleheader />
				<hr className="border-t-[1.5px] border-Gray20" />
			</div>
			<ReviewList />
			<ReviewPagination />
		</div>
	)
}
