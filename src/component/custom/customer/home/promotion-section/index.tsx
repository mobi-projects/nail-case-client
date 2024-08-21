import PromotionImage01 from "@/../public/asset/promotion-01.png"
import PromotionImage02 from "@/../public/asset/promotion-02.jpg"
import PromotionImage03 from "@/../public/asset/promotion-03.png"
import PromotionImage04 from "@/../public/asset/promotion-04.png"

import OverrideContent from "./override-content"
import PromotionCard from "./promotion-card"

export default function PromotionSection() {
	return (
		<div className="relative flex h-[300px] w-full items-center">
			<div className="absolute left-1/2 flex h-full w-dvw max-w-[2200px] -translate-x-1/2 items-center justify-center gap-x-12 overflow-x-hidden bg-BGblue01">
				<PromotionCard src={PromotionImage01} />
				<PromotionCard
					src={PromotionImage02}
					className="bg-gradient-to-r from-PB100 from-70% to-cyan-50"
				>
					<OverrideContent
						title="NewTips Open"
						description="NewTips에서 네일을 예약하세요."
					/>
				</PromotionCard>
				<PromotionCard
					src={PromotionImage03}
					className="bg-gradient-to-r from-violet-700 from-70% to-violet-100"
				>
					<OverrideContent
						title="손톱 관리는 NewTips에서"
						description="NewTips 추천 매장에서 네일예약을 해보세요."
					/>
				</PromotionCard>
				<PromotionCard src={PromotionImage04} />
			</div>
		</div>
	)
}
