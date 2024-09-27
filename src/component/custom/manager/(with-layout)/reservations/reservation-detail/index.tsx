import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import DeatailBox from "./detail-box"
import ReservationOption from "./reservation-option"
import ReservationRefuseModal from "./reservation-refuse-modal"

export default function ReservationDetail() {
	const { onOpenModal } = useModal()

	const onClickRefuseBtn = () => {
		onOpenModal({
			size: "small",
			isX: false,
			children: <ReservationRefuseModal />,
		})
	}

	return (
		<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[1fr_6fr_1fr_1fr] rounded-md border border-Gray20 bg-White p-6 shadow-customGray80">
			<DeatailBox title="이름(예약자)">
				<p className="text-Body02 text-Gray60">홍길동</p>
			</DeatailBox>
			<DeatailBox title="선택 사항">
				<div className="relative">
					<div className="absolute left-0 top-10 h-full -translate-x-10">
						<div className="grid h-[78%] grid-rows-4">
							<ReservationOption title="시술 내용" option={["이달의 아트"]} />
							<ReservationOption
								title="제거 유무"
								option={["자샵 제거 필요"]}
							/>
							<ReservationOption title="연장 유무" option={["연장 필요"]} />
							<ReservationOption
								title="컨디션"
								option={["손톱 보수 필요", " A/S 필요"]}
								require={false}
							/>
						</div>
					</div>
				</div>
			</DeatailBox>
			<DeatailBox title="희망 시술 시간">
				<p className="text-Body02 text-Gray60">
					2024년 9월 20일 (금요일) 오후 09:30
				</p>
			</DeatailBox>
			<div className="flex scale-90 items-center justify-end gap-[20px]">
				<NTButton variant="secondary" size="small">
					수락
				</NTButton>
				<NTButton variant="alert" size="small" onClick={onClickRefuseBtn}>
					거절
				</NTButton>
			</div>
		</div>
	)
}
