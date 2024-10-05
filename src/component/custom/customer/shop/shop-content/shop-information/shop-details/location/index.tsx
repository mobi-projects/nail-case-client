import type { ShopInformaionPT } from "../.."
import CardForm from "../card-form"

export default function LoactionForm({ data }: ShopInformaionPT) {
	const locationFun = (address: string) => {
		return address.replace(/(동\s)/, "$1\n")
	}
	return <CardForm title="Loaction" content={locationFun(data.address)} />
}
