import NTIcon from "@/component/common/nt-icon"

type CustomerShopReservationHeaderPT = {
	name: string
}

export default function CustomerShopReservationHeader({
	name,
}: CustomerShopReservationHeaderPT) {
	return (
		<header className="h-[120px] w-full">
			<div className="fixed left-0 top-0 z-10 flex h-[120px] w-full items-center justify-center border-b-[2px] border-b-Gray20 bg-White">
				<div className="relative flex h-full w-[1200px] items-center justify-center">
					<NTIcon
						icon="back"
						className="absolute left-0 top-1/2 w-fit translate-y-[-50%] hover:cursor-pointer"
					/>
					<h1 className="text-Title01 text-Gray100">{name}</h1>
				</div>
			</div>
		</header>
	)
}
