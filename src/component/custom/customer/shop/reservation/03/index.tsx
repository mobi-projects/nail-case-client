"use client"
import NTOption from "@/component/common/nt-option"

type ArtistPT = {
	artistArr: string[]
}

export default function Artist({ artistArr }: ArtistPT) {
	return (
		<NTOption
			className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
			optionArr={artistArr}
			size="large"
		/>
	)
}
