import RequirementsDetail from "./requirements-detail"
import { CATEGORIES } from "./requirements.constant"

export default function ReservationRequirements() {
	const categoriesLength = CATEGORIES.length
	return (
		<div className="flex h-full w-[600px] flex-col justify-center rounded-[26px] px-5 shadow-customGray70 max-lg:w-full">
			{CATEGORIES.map((category, idx) => (
				<div key={idx}>
					<RequirementsDetail
						title={category.title}
						options={category.options}
						isLastItem={categoriesLength === idx + 1}
					/>
				</div>
			))}
		</div>
	)
}
