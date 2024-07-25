import * as z from "zod"

import { ADDRESS, SHOP_NAME, TELEPHONE } from "./register-form.constant"

export const SIMPLE_SCHEMA = z.object({
	[SHOP_NAME.key]: z
		.string({
			required_error: "매장 이름을 등록해주세요.",
		})
		.max(20, { message: "최대 20자 이내로 작성해주세요." }),
	[ADDRESS.key]: z
		.string({
			required_error: "주소를 입력해주세요.",
		})
		.min(5, { message: "최소 5 글자 이내로 작성해주세요." })
		.max(50, { message: "최대 50 글자 이내로 작성해주세요." }),
	[TELEPHONE.key]: z.number({
		required_error: "전화 번호를 등록해주세요.",
	}),
})
