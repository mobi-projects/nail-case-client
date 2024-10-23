type ResponseMessagePT = { isError: boolean }

export default function ResponseMessage({ isError }: ResponseMessagePT) {
	return (
		<div className="flex h-fit w-full flex-col items-center gap-[1px]">
			{isError ? (
				<>
					<p className="text-center text-Title01 font-Bold text-red-500/90 max-md:text-[18px]">
						예약 요청 중, 오류가 발생했습니다.
					</p>
					<p className="text-center text-Callout font-Light text-red-500/90">
						예약 내용을 다시 확인해주세요.
					</p>
				</>
			) : (
				<>
					<p className="text-center text-Title01 font-Bold max-md:text-[18px]">
						예약이 요청되었습니다.
					</p>
					<p className="text-center text-Callout font-Light">
						예약확정에 시간이 소요될 수 있습니다.
					</p>
				</>
			)}
		</div>
	)
}
