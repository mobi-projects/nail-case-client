import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import { ModalVariants } from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { cn } from "@/config/tailwind"
import { QUERY_MONTHLY_ART_ARR } from "@/constant"
import { type TNailTreatment } from "@/type/union-option/nail-treatment"
import { getMonthlyArtList } from "@/util/api/list-monthly-art"
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
	const { onOpenModal } = useModal()

	if (isLoading) return <AOMLoading />
	if (isError || isUndefined(data)) return <AOMError />
	const imageIdx = data.dataList.findIndex(
		(info) => info.imageId === treatment.imageId,
	)
	const hasImageUrl = !!data.dataList[imageIdx]

	const onClickImage = () => {
		onOpenModal({
			size: "exSmall",
			isX: false,
			children: (
				<SeletedAomImageModal imageUrl={data.dataList[imageIdx].imageUrl} />
			),
		})
	}

	return hasImageUrl ? (
		<div
			className={cn(
				"group relative h-14 w-14 cursor-pointer rounded-lg transition-all",
				hasImageUrl && "hover:scale-110",
			)}
			onClick={onClickImage}
		>
			<Image
				alt="이달의 아트"
				src={data.dataList[imageIdx].imageUrl}
				fill
				sizes="10vw"
				className="rounded-lg"
			/>
			<div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-lg bg-Gray20/50 font-SemiBold text-White opacity-0 transition-all group-hover:opacity-100">
				확대
			</div>
		</div>
	) : (
		<DeletedImageBox />
	)
}

function AOMLoading() {
	return (
		<div className="h-14 w-14 animate-pulse rounded-lg bg-Gray20 transition-all" />
	)
}

function AOMError() {
	return (
		<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-PB50/20 text-Callout text-Gray50">
			<NTIcon icon="rejected" />
		</div>
	)
}

function DeletedImageBox() {
	return (
		<div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-Gray10 text-Caption01 font-Bold text-Gray60">
			<span>
				삭제된 <br />
				이미지
			</span>
		</div>
	)
}

type SeletedAomImageModalPT = { imageUrl: string }

function SeletedAomImageModal({ imageUrl }: SeletedAomImageModalPT) {
	return (
		<div className={cn("relative", ModalVariants({ size: "exSmall" }))}>
			<Image src={imageUrl} alt="이달의 아트 이미지" fill sizes="60vw" />
		</div>
	)
}
