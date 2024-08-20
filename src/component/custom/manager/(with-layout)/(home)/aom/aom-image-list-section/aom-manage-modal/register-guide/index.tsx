import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import { ModalBody } from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"

import { getSlideCss } from "../aom-manage-modal.util"

type RegisterGuidePT = {
	isGuideVisible: boolean
}
export function RegisterGuide({ isGuideVisible }: RegisterGuidePT) {
	const slideCss = getSlideCss(isGuideVisible)
	return (
		<ModalBody
			className={cn(
				"absolute left-0 top-0 flex transform flex-col justify-evenly gap-y-2 pt-5",
				slideCss,
			)}
		>
			<p className="text-Title02 font-SemiBold">
				이달의 아트 등록전에 꼭 확인해 주세요!
			</p>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" />
				<span className="text-base font-SemiBold text-PB100">NewTips</span>
				에서는 사장님들의 편리한 예약을 도와드리기 위해 이달의 아트를 등록 할 때
				<span className="px-1 text-red-500"> 주의</span> 해야할 점이 있어요.
			</div>
			<p className="text-Title02 font-SemiBold">등록 방법</p>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" />
				사진은 최대 <span className="px-1 text-PB100"> 10장</span> 까지 등록
				가능해요.
			</div>
			<div className="flex items-center text-Caption01 text-Gray70">
				<NTIcon icon="dot" className="h-5 w-5" />
				편리한 예약을 위해 네일별로
				<span className="px-1 text-PB100">한장</span>씩 사진을 등록해 주세요.
			</div>
			<div className="flex items-center justify-evenly text-Headline01">
				<div className="flex flex-col items-center justify-center gap-y-1">
					<div className="flex items-center">
						올바른 예시
						<NTIcon icon="check" className="h-7 w-7 pb-1 text-green-600" />
					</div>
					<Image
						alt="예시 사진"
						src={"https://loremflickr.com/320/320/nail"}
						width={250}
						height={250}
					/>
					<p className="flex flex-wrap pt-4 text-Caption02 text-Gray70">
						고객님들의 정확한 사진 선택을 위해
						<span className="px-1 text-PB100">한장</span>씩 올려주세요.
					</p>
				</div>
				<div className="flex flex-col items-center justify-center gap-y-1">
					<div className="flex items-center">
						잘못된 예시
						<NTIcon icon="delete" className="h-7 w-7 pb-1 text-red-500" />
					</div>
					<Image
						alt="예시 사진"
						src={"https://loremflickr.com/320/320/nail"}
						width={250}
						height={250}
					/>
					<p className="flex flex-wrap pt-4 text-Caption02 text-Gray70">
						모든 아트가 포함된 한장의 사진으로 올리는 것은
						<span className="px-1 text-red-500">안돼요.</span>.
					</p>
				</div>
			</div>
		</ModalBody>
	)
}
