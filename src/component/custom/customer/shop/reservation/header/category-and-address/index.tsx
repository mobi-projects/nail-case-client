type CategoryNAddressPT = {
	category: string
	address: string
}

export default function CategoryNAddress({
	category,
	address,
}: CategoryNAddressPT) {
	const printed = [category, "|", address].join("  ")
	return <p className="text-Callout font-Light text-Black">{printed}</p>
}
