"use client"

import { cva } from "class-variance-authority"
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react"
import Image from "next/image"
import type { ReactNode, HTMLAttributes, KeyboardEvent } from "react"
import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

import { cn } from "@/config/tailwind"
import { useShopInfo } from "@/hook/use-common"
import type { TShopInfo } from "@/type"

type BannerCarouselPT = {
	handleCarousel: (api?: EmblaCarouselType) => void
	children: ReactNode
	type: "user" | "manager"
}
type BannerImagePT = {
	shopInfo: TShopInfo
	idx: number
	type: "user" | "manager"
}
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
	opts?: CarouselOptions
	plugins?: CarouselPlugin
	orientation?: "horizontal" | "vertical"
	setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0]
	api: ReturnType<typeof useEmblaCarousel>[1]
	scrollPrev: () => void
	scrollNext: () => void
	canScrollPrev: boolean
	canScrollNext: boolean
	carouselIdx: number
} & CarouselProps

export default function BannerCarousel({
	handleCarousel,
	children,
	type,
}: BannerCarouselPT) {
	const { shopInfo } = useShopInfo()
	if (!shopInfo) return <div>Loading Banner...</div>
	const carouselTotal = shopInfo.srcArr.length
	return (
		<div className="relative">
			<Carousel
				opts={{
					align: "start",
				}}
				className="h-full w-full"
				setApi={handleCarousel}
			>
				<CarouselContent>
					{Array.from({ length: carouselTotal }).map((_, idx) => (
						<CarouselItem key={idx} className="relative h-fit w-fit">
							<BannerImage idx={idx} shopInfo={shopInfo} type={type} />
						</CarouselItem>
					))}
				</CarouselContent>
				{children}
			</Carousel>
		</div>
	)
}
function BannerImage({ shopInfo, idx, type }: BannerImagePT) {
	const { srcArr } = shopInfo
	const BannerVariants = cva(
		"relative -z-20  w-full bg-gradient-to-r from-Gray100 to-White",
		{
			variants: {
				type: {
					user: "h-[30rem]",
					manager: " h-[24rem]",
				},
			},
		},
	)
	return (
		<div className={BannerVariants({ type })}>
			<Image
				src={srcArr[idx]}
				alt="매장정보"
				fill
				priority
				className="-z-10 opacity-60"
			/>
		</div>
	)
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = useContext(CarouselContext)

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />")
	}

	return context
}

const Carousel = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
			},
			plugins,
		)
		const [canScrollPrev, setCanScrollPrev] = useState(false)
		const [canScrollNext, setCanScrollNext] = useState(false)
		const [carouselIdx, setCarouselIdx] = useState(0)

		const onSelect = useCallback((api: CarouselApi) => {
			if (!api) {
				return
			}
			setCarouselIdx(api.selectedScrollSnap())
			setCanScrollPrev(api.canScrollPrev())
			setCanScrollNext(api.canScrollNext())
		}, [])

		const scrollPrev = useCallback(() => {
			api?.scrollPrev()
		}, [api])

		const scrollNext = useCallback(() => {
			api?.scrollNext()
		}, [api])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault()
					scrollPrev()
				} else if (event.key === "ArrowRight") {
					event.preventDefault()
					scrollNext()
				}
			},
			[scrollPrev, scrollNext],
		)

		useEffect(() => {
			if (!api || !setApi) {
				return
			}

			setApi(api)
		}, [api, setApi])

		useEffect(() => {
			if (!api) {
				return
			}

			onSelect(api)
			api.on("reInit", onSelect)
			api.on("select", onSelect)

			return () => {
				api?.off("select", onSelect)
			}
		}, [api, onSelect])

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
					carouselIdx,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		)
	},
)
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel()

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	)
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { orientation } = useCarousel()

		return (
			<div
				ref={ref}
				className={cn(
					"min-w-0 shrink-0 grow-0 basis-full",
					orientation === "horizontal" ? "pl-4" : "pt-4",
					className,
				)}
				{...props}
			/>
		)
	},
)
CarouselItem.displayName = "CarouselItem"
