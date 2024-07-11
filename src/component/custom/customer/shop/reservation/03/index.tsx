"use client"

import NTOption from "@/component/common/nt-option"

type ArtistPT = {
	artistArr: string[]
	isLoading: boolean
	isError: boolean
}

export default function Artist({ artistArr, isLoading, isError }: ArtistPT) {
	if (isLoading)
		return (
			<div className="flex w-full items-center justify-center rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60">
				<div className="aspect-square h-[18px] animate-spin rounded-full bg-gradient-to-tr from-PY100 to-PB100" />
			</div>
		)
	if (isError)
		return (
			<div className="flex w-full items-center justify-center rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60">
				<p className="text-center text-Caption01 text-Gray40">
					데이터를 불러오지 못했습니다.
				</p>
			</div>
		)
	return (
		<NTOption
			className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
			optionArr={artistArr}
			size="large"
		/>
	)
}
