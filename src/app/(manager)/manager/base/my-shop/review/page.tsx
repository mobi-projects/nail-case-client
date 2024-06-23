import ReviewTotalGrade from "@/component/custom/manager/base/my-shop/review/01"
import ReviewTitleheader from "@/component/custom/manager/base/my-shop/review/02"
import ReviewList from "@/component/custom/manager/base/my-shop/review/03"
import ReviewPagination from "@/component/custom/manager/base/my-shop/review/04"

export default function Review() {
	return (
		<div className="flex w-full flex-col gap-[18px] pt-[20px]">
			<ReviewTotalGrade />
			<div className="mt-[24px] flex h-[72px] w-full flex-col justify-between">
				<Divider />
				<ReviewTitleheader />
				<Divider />
			</div>
			<ReviewList />
			<ReviewPagination />
		</div>
	)
}
function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
