export default function ReservationDetailSkeleton() {
	return (
		<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[1fr_6fr_1fr_1fr] rounded-md border border-Gray20 bg-White p-6 shadow-customGray80">
			<div className="grid grid-cols-[1fr_3.5fr]">
				<DetailTitleSkeleton />
				<div className="h-[20px] w-[5rem] animate-pulse rounded-md bg-Gray20" />
			</div>
			<div className="grid grid-cols-[1fr_3.5fr]">
				<DetailTitleSkeleton />
				<div className="relative">
					<div className="absolute left-0 top-10 h-full -translate-x-10">
						<div className="grid h-[75%] grid-rows-4">
							<RequirementsSkeleotn />
							<RequirementsSkeleotn />
							<RequirementsSkeleotn />
							<RequirementsSkeleotn />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-[1fr_3.5fr]">
				<DetailTitleSkeleton />
				<div className="h-[20px] w-[17rem] animate-pulse rounded-md bg-Gray20" />
			</div>
			<div className="flex scale-90 items-center justify-end gap-[20px]">
				<div className="h-[50px] w-[7rem] animate-pulse rounded-xl bg-Gray20" />
				<div className="h-[50px] w-[7rem] animate-pulse rounded-xl bg-Gray20" />
			</div>
		</div>
	)
}

function DetailTitleSkeleton() {
	return (
		<div className="h-[24px] w-[4.5rem] animate-pulse rounded-md bg-Gray20" />
	)
}

function RequirementsSkeleotn() {
	return (
		<div className="flex w-full items-center gap-x-4">
			<DetailTitleSkeleton />
			<div className="h-[40px] w-[6rem] animate-pulse rounded-full bg-Gray20" />
		</div>
	)
}
