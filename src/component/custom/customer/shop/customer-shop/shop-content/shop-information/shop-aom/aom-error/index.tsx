export default function AOMError() {
	return (
		<div className="mx-10 mb-10 flex h-[26rem] w-full items-center justify-center rounded-3xl bg-White shadow-customGray80 lg:h-[18rem] xl:h-[22rem] max-md:h-[10rem] max-2xl:mx-2">
			<p className="break-all text-Title02 font-SemiBold text-Gray70 max-md:text-[18px]">
				네트워크 문제로 이미지를 불러오지 못했습니다.
			</p>
		</div>
	)
}
