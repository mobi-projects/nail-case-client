"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import NTOption from "@/component/common/nt-option"

export default function ReservationCheck() {
	return (
		<div className="flex h-fit w-full flex-col p-[10px]">
			<div className="absolute left-0 top-[10px] flex h-[85.09px] w-full items-center justify-center bg-Gray10">
				<div className="w-[1200px] px-[10px] text-Title03 font-SemiBold text-black">
					예약 내용 확인
				</div>
			</div>
			<div className="mt-[85px] flex items-center border-b border-Gray20 py-[30px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					시술 시간
				</div>
				<div className="text-Body01 font-SemiBold text-PB100">
					6월 27일 (목요일) 오후 1:00 - 2:00
				</div>
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					시술 내용
				</div>
				<NTOption optionArr={["케어", "사진 등록"]} />
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					네일 제거 유무
				</div>
				<NTOption optionArr={["타샵 제거 필요"]} />
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					연장 유무
				</div>
				<NTOption optionArr={["연장 필요 없음"]} />
			</div>
			<div className="mt-[40px] flex justify-center gap-[22px]">
				<NTButton variant="secondary">예약취소</NTButton>
				<NTButton>채팅하기</NTButton>
			</div>
		</div>
	)
}
