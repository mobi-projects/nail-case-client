type LoactionPT = { address: string }

export default function Loaction({ address }: LoactionPT) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">위치</div>
			<div className="flex items-center gap-x-3 pl-3">
				<div className="ring-PB50v h-2 w-2 rounded-full bg-PB100 ring-2 max-md:h-1 max-md:w-1" />
				<p className="pl-5 text-Gray70 max-md:text-[14px]">{address}</p>
			</div>
		</div>
	)
}
