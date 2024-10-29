import AOMImageSingleSkelotn from "./aom-image-single-skeloton"

export default function AOMSkelton() {
	return (
		<div className="grid h-[360px] w-full grid-cols-[380px_auto] rounded-2xl bg-White shadow-customGray80 max-lg:hidden">
			<div className="flex h-full w-full items-center justify-center rounded-2xl bg-BGblue01">
				<div className="h-80 w-80 min-w-80 transform animate-pulse rounded-3xl bg-Gray20 duration-700" />
			</div>
			<div className="grid h-full w-full grid-rows-[30px_30px_215px_30px] p-4">
				<div className="h-7 w-24 transform animate-pulse rounded-md bg-Gray20" />
				<div className="h-7 w-9 transform animate-pulse rounded-md bg-Gray20" />
				<div className="flex h-full w-full items-center justify-center">
					<div className="flex gap-x-4 pr-4">
						{Array.from({ length: 5 }, (_, idx) => (
							<AOMImageSingleSkelotn key={idx} />
						))}
					</div>
				</div>
				<div className="h-14 w-24 transform animate-pulse rounded-xl bg-Gray20" />
			</div>
		</div>
	)
}
