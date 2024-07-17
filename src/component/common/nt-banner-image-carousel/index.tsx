"use client"

import Image from "next/image"
import { type HTMLAttributes } from "react"

import NTLogo from "@/../public/asset/nt-logo.svg"
import { cn } from "@/config/tailwind"
import { useBannerImageCarousel } from "@/hook/use-component"

type TImageProp = {
	src: string
	alt: string
}

type NTBannerImageCarouselPT = HTMLAttributes<HTMLDivElement> & {
	isInfinity?: boolean
	essentialImagePropArr?: TImageProp[]
	objectFit?:
		| "object-contain"
		| "object-cover"
		| "object-fill"
		| "object-scale-down"
	accessSelected?: (idx: number) => void
}

export default function NTBannerImageCarousel({
	isInfinity = false,
	essentialImagePropArr = [],
	objectFit = "object-cover",
	accessSelected,
	className,
	...rest
}: NTBannerImageCarouselPT) {
	const { carouselRef } = useBannerImageCarousel(isInfinity, accessSelected)
	const isImageList = (arr: TImageProp[]) => arr.length > 0

	return (
		<div
			className={cn("relative h-56 w-full overflow-hidden", className)}
			ref={carouselRef}
			{...rest}
		>
			{isImageList(essentialImagePropArr) ? (
				<ImageList {...{ essentialImagePropArr, objectFit }} />
			) : (
				<WithoutNoImages />
			)}
			<GradientFilter />
		</div>
	)
}
NTBannerImageCarousel.display = "NTBannerImageCarousel"

type ImageListPT = Pick<
	NTBannerImageCarouselPT,
	"essentialImagePropArr" | "objectFit"
>
function ImageList({ essentialImagePropArr = [], objectFit }: ImageListPT) {
	return (
		<ul className="flex h-full">
			{essentialImagePropArr.map((essentialImageProp, idx) => (
				<li
					key={idx}
					className="relative flex min-w-0 flex-[0_0_100%] items-center justify-center bg-White"
				>
					<Image
						fill
						src={essentialImageProp.src}
						alt={essentialImageProp.alt}
						className={cn(`${objectFit}`, "object-center")}
					/>
				</li>
			))}
		</ul>
	)
}
function WithoutNoImages() {
	return (
		<div className="flex h-full">
			<div className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center gap-5 bg-White">
				<div className="relative h-[70px] w-[200px]">
					<Image src={NTLogo} alt="brand-logo" fill priority />
				</div>
				<p className="text-Body01">
					{'"'}완벽한 손끝을 위한 당신의 새로운 예약 파트너{'"'}
				</p>
			</div>
		</div>
	)
}
function GradientFilter() {
	return (
		<div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-Gray90/60 to-Gray90/5" />
	)
}
