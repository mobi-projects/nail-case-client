import type { Dispatch, SetStateAction } from "react"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
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
			<div className="flex h-[44px] w-full items-center justify-center text-center">
				<NTLoadingSpinner size="small" />
			</div>
		)
	if (isError)
		return (
			<p className="flex h-[44px] items-center justify-center text-center text-Caption01 text-Gray40">
				데이터를 불러오지 못했습니다.
			</p>
		)
	return (
		<NTOption
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
