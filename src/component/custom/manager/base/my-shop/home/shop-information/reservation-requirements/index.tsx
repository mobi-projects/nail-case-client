import { CATEGORIES } from "./mock"
import RequirementsDetail from "./requirements-detail"

export default function ReservationRequirements() {
	const lastIdx = CATEGORIES.length
	return (
		<div className="flex h-full w-[600px] flex-col justify-center rounded-[26px] px-5 shadow-customGray70">
			{CATEGORIES.map((category, idx) => (
				<div key={idx}>
					<RequirementsDetail
						title={category.title}
						options={category.options}
						isLastItem={lastIdx === idx + 1}
					/>
				</div>
			))}
		</div>
	)
}
