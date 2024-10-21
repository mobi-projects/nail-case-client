export default function AOMSkelton() {
	return (
		<div className="relative flex h-[30rem] w-full px-2">
			<div className="w-full gap-4">
				<div className="flex gap-4">
					{[...Array(3)].map((_, idx) => (
						<div
							key={idx}
							className="animation-pulse h-[26rem] w-[32.33%] flex-shrink-0 rounded-3xl bg-Gray20 px-2 text-Gray70 shadow-customGray80 md:h-[12rem] md:w-[12rem] lg:h-[16rem] lg:w-[16rem] xl:h-[18rem] xl:w-[18rem] max-sm:h-[8rem] max-sm:w-[8rem]"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
