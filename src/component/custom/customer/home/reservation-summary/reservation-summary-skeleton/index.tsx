export default function ReservationSummarySkeleton() {
	return (
		<div className="relative my-10 h-[288px] w-2/3 rounded-3xl bg-White px-8 py-4 shadow-customGray80 max-md:py-3 max-lg:h-fit max-lg:w-full">
			<div className="my-3 h-[30px] w-[8rem] animate-pulse rounded-xl bg-Gray20 transition-all lg:h-[26px] max-md:h-[20px] max-md:w-[6rem]" />
			<div className="grid grid-cols-[12rem_1fr] max-md:grid-cols-[8rem_1fr]">
				<div className="flex h-full w-fit items-center justify-center">
					<div className="h-40 w-40 animate-pulse rounded-full bg-Gray20 transition-all max-md:h-28 max-md:w-28" />
				</div>
				<div className="grid grid-rows-4">
					<p className="h-[40px] w-[10rem] animate-pulse rounded-xl bg-Gray20 transition-all lg:mt-2 lg:h-[35px] max-md:mt-1 max-md:h-[25px] max-md:w-[6rem]" />
					<p className="mt-2 h-[40px] w-[15rem] animate-pulse rounded-xl bg-Gray20 transition-all lg:mt-1 lg:h-[35px] max-md:mt-0 max-md:h-[25px] max-md:w-[8rem]" />
					<p className="mt-2 h-[35px] w-[10rem] animate-pulse rounded-xl bg-Gray20 transition-all lg:mt-0 max-md:mt-0 max-md:h-[25px] max-md:w-[5rem]" />
					<div className="flex w-full items-center justify-end">
						<div className="h-[50px] w-[6.8rem] animate-pulse rounded-xl bg-Gray20 transition-all lg:h-[45px] max-md:h-[40px] max-md:w-[4rem]" />
					</div>
				</div>
			</div>
			<div className="absolute right-5 top-3 h-[2.4rem] w-[5.2rem] animate-pulse rounded-[35px] bg-Gray20 px-[15.5px] transition-all lg:h-[2rem] lg:w-[4.4rem] max-md:h-[1.3rem] max-md:w-[2.7rem]" />
		</div>
	)
}
