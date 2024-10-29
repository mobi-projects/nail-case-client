import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import AOMHandleModal from "../../aom-image-list-section/aom-manage-modal"
export default function RegisterBox() {
	const { onOpenModal } = useModal()

	const onClickRegisterBtn = () => {
		onOpenModal({ size: "large", isX: false, children: <AOMHandleModal /> })
	}

	return (
		<div className="flex h-80 w-80 flex-col items-center justify-center gap-y-3 rounded-3xl border-[1.5px] border-PB50 bg-BGblue01 text-Gray70 max-md:mt-5 max-md:h-52 max-md:w-52">
			<NTIcon icon="camera" className="h-9 w-9 text-Gray80" />
			<p className="text-Body01 text-[18px] font-SemiBold">
				사진을 등록하세요.
			</p>
			<p className="text-Body02"> 최대 10장까지 첨부 가능해요.</p>
			<NTButton flexible={"fit"} onClick={onClickRegisterBtn}>
				<span className="max-md:text-[14px]">이달의 아트 등록</span>
			</NTButton>
		</div>
	)
}
