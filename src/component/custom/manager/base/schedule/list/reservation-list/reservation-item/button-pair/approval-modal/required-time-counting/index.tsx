"use client"

type RequiredTimeCountingPT = {
	requiredTime: number
	onClickIncreasingButton: VoidFunction
	onClickDecreasingButton: VoidFunction
}

export default function RequiredTimeCounting({
	requiredTime,
	onClickIncreasingButton,
	onClickDecreasingButton,
}: RequiredTimeCountingPT) {
	return (
		<div className="flex h-full w-full flex-col gap-[20px]">
			<p className="text-Body01 font-SemiBold text-Gray90">소요시간 설정</p>
			<div className="flex h-[200px] w-full items-center justify-around">
				<button
					className="aspect-square w-[56px] cursor-pointer rounded-full bg-BGblue01 drop-shadow transition-transform hover:scale-105 hover:bg-BGblue02 focus-visible:outline-none active:bg-Gray10"
					onClick={onClickDecreasingButton}
				>
					<p className="text-center text-Callout text-Gray60">-</p>
				</button>

				<div className="flex aspect-square w-[150px] items-center justify-center rounded-[26px] bg-BGblue02 drop-shadow">
					<p className="text-center text-Headline02 text-PB90">
						{requiredTime} 분
					</p>
				</div>

				<button
					className="aspect-square w-[56px] cursor-pointer rounded-full bg-BGblue01 drop-shadow transition-transform hover:scale-105 hover:bg-BGblue02 focus-visible:outline-none active:bg-Gray10"
					onClick={onClickIncreasingButton}
				>
					<p className="text-center text-Callout text-Gray60">+</p>
				</button>
			</div>
		</div>
	)
}
