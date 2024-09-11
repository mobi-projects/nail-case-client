import AOMImageSingleSkelotn from "./aom-image-single-skeloton"

export default function AOMSkelton() {
	return (
		<div className="flex h-full w-[550px] justify-center rounded-[26px] py-12 pl-8 shadow-customGray70">
			<div className="flex h-[26rem] w-[45rem] items-center justify-center rounded-3xl bg-Gray20 text-Gray70" />
			<div className="flex h-full w-full flex-col items-center">
				<div className="relative flex h-full w-full transform items-center gap-x-5 overflow-x-hidden transition-transform duration-300">
					<div className="absolute top-1 flex w-full transform flex-col items-center gap-y-1 transition-transform duration-1000">
						{Array.from({ length: 3 }, (_, idx) => (
							<AOMImageSingleSkelotn key={idx} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
