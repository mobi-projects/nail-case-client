"use client"

import { NTButton } from "@/component/common/atom/nt-button"

import ImageForm from "./image-form"
import InputWrapper from "./input-wrapper"
import OpeningHoursForm from "./opening-hours-form"
import SimpleInput from "./simple-form"

export default function ShopRegisterForm() {
	return (
		<div className="mt-[30px] flex w-full flex-col gap-[65px] px-[20px]">
			<InputWrapper
				required={true}
				label="매장 이름"
				description="사업자 등록증에 명시된 상호명을 입력해주세요.(최대 50자)"
				example="모비네일 한남점"
			>
				<SimpleInput />
			</InputWrapper>

			<InputWrapper
				required={true}
				label="주소"
				description="사업자 등록증에 명시된 영업장 주소을 입력해주세요."
				example="○○시 ◇◇구 △△동 123-321"
			>
				<SimpleInput />
			</InputWrapper>

			<InputWrapper
				required={true}
				label="전화번호"
				description="숫자만 입력해주세요."
				example="010xxxxxxxx, 02xxxxxxx"
			>
				<SimpleInput />
			</InputWrapper>

			<InputWrapper
				required={true}
				label="영업시간"
				description="요일별, 영업시간을 입력해주세요."
			>
				<OpeningHoursForm />
			</InputWrapper>

			<InputWrapper
				required={false}
				label="매장 이미지"
				description="권장 사이즈: 1280 x 540 (최대 5장)"
			>
				<ImageForm maxCount={5} />
			</InputWrapper>

			<InputWrapper
				required={false}
				label="가격표 (이미지)"
				description="권장 사이즈: 540 x 675 (최대 5장)"
			>
				<ImageForm maxCount={5} />
			</InputWrapper>

			<div className="flex h-fit w-full items-center justify-center">
				<NTButton variant="secondary">등록하기</NTButton>
			</div>
		</div>
	)
}
