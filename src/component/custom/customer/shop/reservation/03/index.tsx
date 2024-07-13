"use client"

import type { Dispatch, SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import { useListShopNailArtist } from "@/hook/use-shop-controller"
import type { TResGetListShopNailArtist } from "@/type/shop"
import { isUndefined } from "@/util/common/type-guard"

type ArtistPT = {
	shopId: number
	companion: number
	artistIdArr: number[]
	setArtistIdArr: Dispatch<SetStateAction<number[]>>
}

export default function Artist({
	shopId,
	companion,
	artistIdArr,
	setArtistIdArr,
}: ArtistPT) {
	const { data, isLoading, isError } = useListShopNailArtist(shopId)
	const artistInfoArr = data?.dataList
	const artistNicknameArr = isError ? [] : getArtistNicknameArr(artistInfoArr)

	const onClickArtistOption = (idx: number) => {
		setArtistIdArr((prev) => {
			let _prev = [...prev]
			if (_prev.includes(idx)) {
				_prev = _prev.filter((elem) => elem !== idx)
			} else _prev.push(idx)
			while (_prev.length > companion) _prev.shift()
			return _prev
		})
	}

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
			optionArr={artistNicknameArr}
			selectedIdxArr={artistIdArr}
			size="large"
			onSelect={onClickArtistOption}
		/>
	)
}

const getArtistNicknameArr = (
	artistInfoArr: TResGetListShopNailArtist[] | undefined,
) => {
	if (isUndefined(artistInfoArr)) return []
	return artistInfoArr.map(
		(artistInfo: TResGetListShopNailArtist) => artistInfo.nickname,
	)
}
