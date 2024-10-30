import { useState } from "react"

import { cn } from "@/config/tailwind"

import { STATUS_WITHOUT_CANCELED_ARR } from "../../reservations.constant"

import MoblieCategoryItem from "./mobile-category-item"

export default function MobileReservationSideBar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="hidden max-lg:block">
			{/* 사이드바 아이콘 */}
			<div
				className={cn(
					"fixed bottom-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-PB100 shadow-customGray80 transition-all",
					isOpen ? "-right-[3rem] opacity-100" : "right-3 opacity-100",
				)}
				onClick={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				tabIndex={0}
			>
				<p className="text-[30px] text-White">+</p>
			</div>

			{/* 사이드바 */}
			<div
				className={cn(
					"fixed bottom-0 right-0 z-40 transition-all max-lg:flex",
					isOpen ? "right-0 opacity-100" : "-right-[13rem] opacity-100",
				)}
			>
				<div
					className="w-[13rem] transform bg-White shadow-customGray80"
					tabIndex={0}
					onBlur={() => setIsOpen(false)}
				>
					<p className="flex h-10 items-center border-b border-Gray10 bg-Gray10 px-5 text-Title02 font-SemiBold text-Gray70 max-md:text-[18px]">
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
		</div>
	)
}
