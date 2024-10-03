import { type ChangeEvent, useState } from "react"

export default function PriceInput() {
	const [value, setValue] = useState("")

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value // 입력값을 inputValue 라고 선언
		const numCheck = /^[0-9,]*$/.test(inputValue) // 입력값이 숫자와 콤마(,)인지 확인

		// 숫자가 아닌 문자로 이루어져 있으면 pass! (입력이 x)
		if (!numCheck && inputValue) return

		if (numCheck) {
			// 숫자이면
			const numValue = inputValue.replaceAll(",", "") // 잠시 콤마를 제거하고
			// 받은 값에 3자리마다 콤마를 추가
			inputValue = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		setValue(inputValue) // 바깥에서 사용할 수 있도록 state 값에 세팅
	}
	return (
		<input
			onChange={handleOnChange}
			className="h-[40px] w-[10rem] appearance-none rounded-lg border-2 border-Gray20 px-3 text-end font-SemiBold text-PB80 transition-all focus:appearance-none focus:border-PB70 focus:outline-none"
			placeholder="가격을 입력해주세요"
			name="price"
			autoComplete="off"
			type="text"
			value={value}
		/>
	)
}
