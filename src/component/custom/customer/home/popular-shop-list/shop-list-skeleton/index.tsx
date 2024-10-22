export function ShopListSkeleton() {
	return (
		<div className="flex h-fit w-full flex-wrap items-start justify-center gap-x-5 gap-y-8 pt-4 max-sm:gap-x-4 max-sm:gap-y-6">
			{Array.from({ length: 6 }, (_, idx) => (
				<SkeletonCard key={idx} />
			))}
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<div className="ml-4 h-5 w-20 animate-pulse cursor-pointer rounded-2xl bg-Gray20 transition-all max-sm:ml-2 max-sm:w-16 max-lg:h-4" />
			<div className="h-[264px] w-[384px] animate-pulse rounded-[26px] bg-Gray20 transition-all md:h-[140px] md:rounded-2xl lg:h-48 lg:rounded-2xl xl:h-[250px] max-sm:h-[100px] max-sm:rounded-lg max-xl:w-[40dvw]" />
		</div>
	)
}
