export default function ReservationSummarySkeleton() {
	return (
		<div className="relative my-10 h-[288px] w-2/3 rounded-3xl bg-White px-8 py-4 shadow-customGray80">
			<div className="my-3 h-[30px] w-[8rem] animate-pulse rounded-xl bg-Gray20 transition-all" />
			<div className="grid grid-cols-[12rem_1fr]">
				<div className="h-40 w-40 animate-pulse rounded-full bg-Gray20 transition-all" />
				<div className="grid grid-rows-4">
					<p className="h-[40px] w-[10rem] animate-pulse rounded-xl bg-Gray20 transition-all" />
					<p className="mt-2 h-[40px] w-[15rem] animate-pulse rounded-xl bg-Gray20 transition-all" />
					<p className="mt-2 h-[34px] w-[10rem] animate-pulse rounded-xl bg-Gray20 transition-all" />
					<div className="flex w-full items-center justify-end">
						<div className="h-[50px] w-[6.8rem] animate-pulse rounded-xl bg-Gray20 transition-all" />
					</div>
				</div>
			</div>
			<div className="absolute right-5 top-3 h-[2.4rem] w-[5.2rem] animate-pulse rounded-[35px] bg-Gray20 px-[15.5px] transition-all" />
		</div>
	)
}
