import type { CookieValueTypes } from "cookies-next"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import NTLogo from "@/../public/asset/nt-logo.svg"

import HeaderMenu from "./header-menu"
import ManagerToolbar from "./toolbar"

export default function ManagerBaseHeader() {
	const shopId = getCookie("shopId", { cookies })
	return (
		<div className="flex h-fit w-full flex-col gap-[8.5px] pb-[14px] pt-8 lg:pt-4 max-md:pt-5 max-xl:px-4">
			<div className="flex h-fit w-full flex-col gap-[16.5px]">
				<ManagerLayoutCatalog shopId={shopId} />
				<ManagerToolbar shopId={shopId as string} />
			</div>
		</div>
	)
}

type ManagerLayoutCatalogPT = {
	shopId: CookieValueTypes
}
function ManagerLayoutCatalog({ shopId }: ManagerLayoutCatalogPT) {
	return (
		<div className="flex h-[51px] w-full items-center justify-between max-md:h-[20px]">
			<Link href={`/manager/${shopId}`}>
				<Image
					src={NTLogo}
					alt="brand-logo"
					width={134}
					height={38}
					priority
					className="cursor-pointer lg:h-7 lg:w-24 max-md:h-6 max-md:w-20"
				/>
			</Link>
			<HeaderMenu />
		</div>
	)
}
