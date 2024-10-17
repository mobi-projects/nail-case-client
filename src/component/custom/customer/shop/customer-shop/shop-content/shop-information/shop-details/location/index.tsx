import type { ShopInformaionPT } from "../.."
import InfoCard from "../info-card"

export default function LoactionCard({ data }: ShopInformaionPT) {
	return <InfoCard title="가게 위치" content={data.address} showDot={true} />
}
