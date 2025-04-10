type ShopNamePT = { shopName: string }

export const ShopName = ({ shopName }: ShopNamePT) => {
	return (
		<p className="text-Title01 font-Bold text-Black lg:text-[22px] max-md:text-[18px]">
			{shopName}
		</p>
	)
}
