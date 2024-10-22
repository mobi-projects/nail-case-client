export default function AOMSkelton() {
	return (
		<div className="relative flex h-[30rem] w-full px-2 max-xl:px-6">
			<div className="w-full gap-4">
				<div className="flex gap-8">
					{[...Array(3)].map((_, idx) => (
						<div
							key={idx}
							className="animation-pulse h-[26rem] w-[32.33%] flex-shrink-0 rounded-3xl bg-Gray20 px-2 text-Gray70 shadow-customGray80 md:h-[10rem] md:w-[13rem] lg:h-[16rem] lg:w-[29dvw] xl:h-[20rem] xl:w-[29dvw] max-sm:h-[10rem] max-sm:w-[10rem] max-md:px-5"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
