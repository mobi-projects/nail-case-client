import AOMImageSingleSkelotn from "./aom-image-single-skeloton"

export default function AOMSkelton() {
	return (
		<div className="flex h-80 w-full items-center gap-x-5">
			<div className="h-80 w-80 min-w-80 transform animate-pulse rounded-3xl bg-Gray20 duration-700" />
			<div className="flex h-full w-full flex-col justify-evenly gap-y-2 border-l-2 border-l-Gray20 pl-8">
				<div className="h-6 w-1/4 transform animate-pulse rounded-xl bg-Gray20" />
				<div className="h-6 w-1/4 transform animate-pulse rounded-xl bg-Gray20" />
				<div className="flex gap-x-3 pl-8">
					{Array.from({ length: 5 }, (_, idx) => (
						<AOMImageSingleSkelotn key={idx} />
					))}
				</div>

				<div className="h-12 w-20 transform animate-pulse rounded-xl bg-Gray20" />
			</div>
		</div>
	)
}
