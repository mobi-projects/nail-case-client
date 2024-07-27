"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { NTButton } from "@/component/common/atom/nt-button"
import { useRegisterShop } from "@/hook/use-shop-controller"

import ImageForm from "./image-form"
import InputWrapper from "./input-wrapper"
import { ADDRESS, SHOP_NAME, TELEPHONE } from "./register-form.constant"
import { SIMPLE_SCHEMA } from "./register-form.schema"
import {
	createRequestFrom,
	getIsValidOpeningHours,
	initWorkHours,
} from "./register-form.util"
import type { TWorkHour } from "./register.form.type"
import SimpleInput from "./simple-form"
import OpeningHoursForm from "./work-hours-form"

export default function ShopRegisterForm() {
	const {
		register,
		getValues,
		formState: { errors, isValid: isValidSimple },
	} = useForm({
		resolver: zodResolver(SIMPLE_SCHEMA),
		mode: "onBlur",
		reValidateMode: "onChange",
	})
	const [workHours, setWorkHours] = useState<TWorkHour[]>(initWorkHours())
	const [shopProfileFileArr, setShopProfileFileArr] = useState<Array<File>>([])
	const [priceListFileArr, setPriceListFileArr] = useState<Array<File>>([])
	const { mutateAsync } = useRegisterShop()

	const errorMsgForShopName = errors[SHOP_NAME.key]?.message as string
	const errorMsgForAddress = errors[ADDRESS.key]?.message as string
	const errorMsgForTelephone = errors[TELEPHONE.key]?.message as string

	const isValidOpeningHours = useMemo<boolean>(
		() => getIsValidOpeningHours(workHours),
		[workHours],
	)
	const isValidToSubmit = isValidSimple && isValidOpeningHours

	const onClickSubmit = async () => {
		const { shopName, address, telephone } = getValues()
		const formData = createRequestFrom(
			shopName,
			address,
			telephone,
			workHours,
			shopProfileFileArr,
			priceListFileArr,
		)
		const response = await mutateAsync({ reqForm: formData })
		console.log(response)
	}

	return (
		<div className="mt-[30px] flex w-full flex-col gap-[65px] px-[20px]">
			<InputWrapper
				required={true}
				label="매장 이름"
				description="사업자 등록증에 명시된 상호명을 입력해주세요.(최대 50자)"
				example="모비네일 한남점"
			>
				<SimpleInput
					{...register(SHOP_NAME.key)}
					errorMessage={errorMsgForShopName}
				/>
			</InputWrapper>

			<InputWrapper
				required={true}
				label="주소"
				description="사업자 등록증에 명시된 영업장 주소을 입력해주세요."
				example="○○시 ◇◇구 △△동 123-321"
			>
				<SimpleInput
					{...register(ADDRESS.key)}
					errorMessage={errorMsgForAddress}
				/>
			</InputWrapper>

			<InputWrapper
				required={true}
				label="전화번호"
				description="숫자만 입력해주세요."
				example="010xxxxxxxx, 02xxxxxxx"
			>
				<SimpleInput
					{...register(TELEPHONE.key)}
					errorMessage={errorMsgForTelephone}
				/>
			</InputWrapper>

			<InputWrapper
				required={true}
				label="영업시간"
				description="일주일 중, 최소 하루는 예약을 받을 수 있어야 합니다."
			>
				<OpeningHoursForm {...{ workHours, setWorkHours }} />
			</InputWrapper>

			<InputWrapper
				required={false}
				label="매장 이미지"
				description="권장 사이즈: 1280 x 540 (최대 5장)"
			>
				<ImageForm maxCount={5} setImageFileArr={setShopProfileFileArr} />
			</InputWrapper>

			<InputWrapper
				required={false}
				label="가격표 (이미지)"
				description="권장 사이즈: 540 x 675 (최대 5장)"
			>
				<ImageForm maxCount={5} setImageFileArr={setPriceListFileArr} />
			</InputWrapper>

			<div className="flex h-fit w-full items-center justify-center">
				<NTButton disabled={!isValidToSubmit} onClick={onClickSubmit}>
					등록하기
				</NTButton>
			</div>
		</div>
	)
}
