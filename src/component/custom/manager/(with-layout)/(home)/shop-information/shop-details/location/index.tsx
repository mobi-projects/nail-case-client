import NTIcon from "@/component/common/nt-icon"
import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

type LoactionPT = TResGetShopInfo

export default function Loaction({ address }: LoactionPT) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">위치</div>
			<div className="flex items-center gap-x-1">
				<NTIcon icon="dot" className="h-7 w-7" />
				<p className="text-Gray70">{address}</p>
			</div>
		</div>
	)
}
