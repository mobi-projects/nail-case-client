type StatusMessagePT = {
	isError: boolean
	isPending: boolean
	isUndefined: boolean
}
export function StatusMessage({
	isError,
	isPending,
	isUndefined,
}: StatusMessagePT) {
	let message
	let subMessage

	if (isError) {
		message = "데이터를 불러오는 중에 오류가 발생했습니다."
		subMessage = "잠시 후 다시 시도해주세요."
	} else if (isPending) {
		message = "데이터를 불러오는 중입니다."
		subMessage = "잠시만 기다려 주세요."
	} else if (isUndefined) {
		message = "데이터가 존재하지 않습니다."
		subMessage = "잠시 후 다시 시도해주세요."
	}

	return (
		<div className="flex h-[480px] w-full items-center justify-center">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				{message}
				<p className="py-[50px] text-Gray70">{subMessage}</p>
			</div>
		</div>
	)
}
