export function ShopListSkeleton() {
	return (
		<div className="flex h-fit w-full flex-wrap items-start justify-center gap-4 pt-4">
			{Array.from({ length: 6 }, (_, idx) => (
				<SkeletonCard key={idx} />
			))}
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<div className="ml-3 h-4 w-20 animate-pulse cursor-pointer rounded-2xl bg-Gray20 transition-all" />
			<div className="h-[264px] w-[384px] animate-pulse rounded-[26px] bg-Gray20 transition-all" />
		</div>
	)
}
