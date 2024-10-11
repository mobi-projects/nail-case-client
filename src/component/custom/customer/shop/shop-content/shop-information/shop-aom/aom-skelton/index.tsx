export default function AOMSkelton() {
	return (
		<div className="relative flex h-[30rem] w-full px-2">
			<div className="w-full gap-4">
				<div className="flex gap-4">
					{[...Array(3)].map((_, idx) => (
						<div
							key={idx}
							className="h-[26rem] w-[32.33%] flex-shrink-0 rounded-3xl px-2 text-Gray70 shadow-customGray80"
						></div>
					))}
				</div>
			</div>
		</div>
	)
}
