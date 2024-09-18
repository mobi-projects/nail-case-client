import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import { QUERY_MONTHLY_ART_ARR } from "@/constant"
import { type TNailTreatment } from "@/type/union-option/nail-treatment"
import { getMonthlyArtList } from "@/util/api-v2/list-monthly-art"
import { isUndefined } from "@/util/common/type-guard"
type SelectedAOMImagePT = {
	isAOM: boolean
	treatment: {
		option: TNailTreatment | null
		imageId?: number
	}
	shopId: number
}

export default function SelectedAOMImage({
	isAOM,
	shopId,
	treatment,
}: SelectedAOMImagePT) {
	const { data, isLoading, isError } = useQuery({
		queryKey: [QUERY_MONTHLY_ART_ARR, shopId],
		queryFn: () => getMonthlyArtList(shopId),
		enabled: isAOM,
	})
	if (isLoading) return <AOMLoading />
	if (isError || isUndefined(data)) return <AOMError />
	const imageIdx = data.dataList.findIndex(
		(info) => info.imageId === treatment.imageId,
	)
	return (
		<div className="relative h-24 w-24 rounded-lg">
			<Image
				alt="이달의 아트"
				src={data.dataList[imageIdx].imageUrl}
				fill
				sizes="10vw"
				className="rounded-lg border-2 border-PY70 ring-2 ring-PY50"
			/>
		</div>
	)
}

function AOMLoading() {
	return (
		<div className="h-24 w-24 animate-pulse rounded-lg bg-Gray20 transition-all" />
	)
}

function AOMError() {
	return (
		<div className="flex h-24 w-full items-center text-Callout text-Gray80">
			이미지 로딩에 실패했습니다.
		</div>
	)
}
