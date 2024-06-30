import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTSearchfield from "@/component/common/nt-searchfield"

export default function EditIntroduction() {
	const { onCloseModal } = useModal()
	const onClickSaving = () => {
		onCloseModal()
	}
	return (
		<ModalContent className="gap-[50px]">
			<ModalHeader className="flex items-center justify-center">
				<p className="text-Body01 text-Gray90">소개글</p>
			</ModalHeader>
			<ModalBody className="flex flex-col gap-[27px]">
				<NTSearchfield />
				<TextArea tags={["#네일맛집", "#주차가능"]} />
			</ModalBody>
			<ModalFooter className="flex h-fit w-full items-center justify-center">
				<NTButton onClick={onClickSaving}>저장하기</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}

function TextArea({ tags = [] }: { tags?: string[] }) {
	return (
		<div className="relative flex h-[200px] w-full flex-col gap-[10px] rounded-[22px] border-[1.6px] border-Gray30 bg-White p-[20px] pt-[10px] outline-none">
			<div className="flex h-fit w-full flex-wrap gap-[5px] text-nowrap">
				{tags.map((tag, idx) => (
					<p key={idx} className="text-[18px] font-SemiBold text-Gray90">
						{tag}
					</p>
				))}
			</div>
			<textarea className="scrollbar-custom h-[70%] w-full resize-none text-[18px] font-Light text-Gray90 focus-visible:outline-none" />
			<TextCounter length={10} />
		</div>
	)
}

type TextCounterPT = {
	length?: number
}

function TextCounter({ length = 0 }: TextCounterPT) {
	return (
		<p className="absolute bottom-[5px] right-[20px] w-full text-end text-Callout text-Gray50">
			{length} 자
		</p>
	)
}
