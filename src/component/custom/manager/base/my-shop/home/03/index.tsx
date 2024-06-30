"use client"

import NTIcon from "@/component/common/nt-icon"
import { useShopInfo } from "@/hook/use-common"

type CardHeaderPT = {
	title: string
}

export default function MyShopInfo() {
	return (
		<div className="flex justify-between">
			<InfoCardWorkingTime />
			<InfoCardLocation />
			<InfoCardNotification />
			<InfoCardPrice />
		</div>
	)
}

function CardHeader({ title }: CardHeaderPT) {
	return (
		<>
			<div className="flex w-[282px] items-center justify-between px-[25px] pb-[10px]">
				<div className="text-Headline02 text-Gray90">{title}</div>
				<NTIcon
					icon="expandRightLight"
					className="h-[24px] w-[24px] cursor-pointer"
				/>
			</div>
			<div className="mx-[25px] border-t-[1.5px] border-Gray20"></div>
		</>
	)
}

function InfoCardWorkingTime() {
	const { shopInfo } = useShopInfo()

	if (!shopInfo) {
		return null
	}

	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] py-[15px] shadow-customGray80">
			<CardHeader title="영업시간" />
			<div className="px-[13px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						월화수목금토
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" /> 월-금
						<span className="ml-2 text-Body01 text-Gray60">
							오전 11시~오후 8시
						</span>
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" /> 토
						<span className="ml-8 text-Body01 text-Gray60">
							오후 1시~오후 6시
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
function InfoCardLocation() {
	const { shopInfo } = useShopInfo()

	if (!shopInfo) {
		return null
	}

	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] py-[15px] shadow-customGray80">
			<CardHeader title="위치" />
			<div className="mt-[20px] px-[25px]">{shopInfo?.address}</div>
		</div>
	)
}
function InfoCardNotification() {
	const { shopInfo } = useShopInfo()

	if (!shopInfo || !shopInfo.guide) {
		return null
	}

	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] py-[15px] shadow-customGray80">
			<CardHeader title="안내사항" />
			<div className="px-[13px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" /> 주차가능
						<span className="ml-2">{`: ${shopInfo.guide.parking}대`}</span>
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{`${shopInfo.guide.companion}명 동반 가능, ${shopInfo.guide.companion + 1}명 불가능`}
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{`예약은 마감시간 ${shopInfo.guide.reservationDeadline}시간 전까지`}
					</div>
				</div>
			</div>
		</div>
	)
}
function InfoCardPrice() {
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] py-[15px] shadow-customGray80">
			<CardHeader title="가격" />
			<div className="px-[13px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" /> 기본가격
					</div>
					<div className="px-[10px] text-Gray60">
						손젤 손 케어+원컬러 40,000원
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						가격표 이미지로 보기
					</div>
				</div>
			</div>
		</div>
	)
}
