import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

import { STATUS_WITHOUT_CANCELED_ARR } from "../../reservations.constant"

import MoblieCategoryItem from "./mobile-category-item"

export default function MobileReservationSideBar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="fixed bottom-0 right-0 z-40 max-lg:flex">
			{/* 사이드바 아이콘 */}
			<div
				className={cn(
					"rounded-l-xl bg-Gray20 shadow-customGray80 transition-all",
					isOpen ? "translate-x-0" : "translate-x-full",
				)}
				tabIndex={-1}
				onBlur={() => setIsOpen(false)}
			>
				<NTIcon
					icon="expandRight"
					className={cn(
						"h-6 w-6 cursor-pointer transition-transform",
						isOpen ? "-rotate-180" : "rotate-0",
					)}
					onClick={() => setIsOpen((prev) => !prev)}
				/>
			</div>

			{/* 슬라이드 애니메이션과 함께 사이드바 내용 */}
			<div
				className={cn(
					"w-[14rem] transform bg-White shadow-customGray80 transition-all",
					isOpen
						? "translate-x-0 opacity-100"
						: "w-6 translate-x-full opacity-0",
				)}
			>
				<p className="flex h-10 items-center border-b border-Gray20 bg-Gray10 px-5 text-Title02 font-SemiBold text-Black max-md:text-[18px]">
					예약 관리 메뉴
				</p>
				<div className="flex flex-col">
					{STATUS_WITHOUT_CANCELED_ARR.map((status) => (
						<MoblieCategoryItem
							status={status}
							key={status}
							setIsOpen={setIsOpen}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
