import type { PropsWithChildren } from "react"

import NTIcon from "@/component/common/nt-icon"

export default function Customer_Shop_04() {
	return (
		<div className="flex h-[164px] w-full justify-between">
			<ShopInfoCard {...mockData[0]} />
			<ShopInfoCard {...mockData[1]} />
			<ShopInfoCard {...mockData[2]} />
			<ShopInfoCard {...mockData[3]} />
		</div>
	)
}

const mockData = [
	{
		title: "영업시간",
		body: "● 월화수목금 \n ● 월-금 오전11시~오후8시 \n ● 토 오후1시~오후6시",
	},
	{
		title: "위치",
		body: "서울특별시 용산구 두텁바위로 131층 모비네일 한남",
	},
	{
		title: "영업시간",
		body: "● 주차 가능 : 1대 \n● 2명 동반 가능, 3명 불가능\n● 예약 마감 시간 1시간 전까지",
	},
	{
		title: "가격",
		body: "● 기본가격 : 손젤 손 케어+원컬러 40,000원 \n● 가격표 이미지로 보기",
	},
]

function ShopInfoCard({ title, body }: { title: string; body: string }) {
	return (
		<div className="flex h-full w-[282px] flex-col gap-[15px] rounded-[26px] px-[23px] py-[20px] shadow-customGray80">
			<ShopInfoCardHeader>{title}</ShopInfoCardHeader>
			<hr className="border-Gray20" />
			<ShopInfoCardBody>{body}</ShopInfoCardBody>
		</div>
	)
}

function ShopInfoCardHeader({ children }: PropsWithChildren) {
	return (
		<div className="flex w-full items-center justify-between">
			<p className="text-Headline02 text-Gray90">{children}</p>
			<NTIcon icon="expandRight" className="h-[20px] w-[20px]" />
		</div>
	)
}

function ShopInfoCardBody({ children }: PropsWithChildren) {
	return (
		<div className="flex w-full items-center justify-between">
			<p className="Body whitespace-pre-line break-keep text-Gray90">
				{children}
			</p>
		</div>
	)
}
