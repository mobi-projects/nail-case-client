import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"

import HeaderMenu from "./header-menu"
import ManagerToolbar from "./toolbar"

export default function ManagerBaseHeader() {
	return (
		<div className="flex h-fit w-full flex-col gap-[8.5px] pb-[14px] pt-[68px]">
			<div className="flex h-fit w-full flex-col gap-[16.5px]">
				<ManagerLayoutCatalog />
				<ManagerToolbar />
			</div>
		</div>
	)
}
function ManagerLayoutCatalog() {
	return (
		<div className="flex h-[51px] w-full items-center justify-between">
			{/* <ShopName /> */}
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
			<HeaderMenu />
		</div>
	)
}
