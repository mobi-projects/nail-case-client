import { NTButton } from "@/component/common/atom/nt-button"
import {
	NTModalContent,
	NTModalFooter,
	NTModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTSearchfield from "@/component/common/nt-searchfield"

export default function EditIntroduction() {
	const { onClose } = useModal()
	const onClickSavingButton = () => {
		onClose()
	}
	return (
		<div className="flex h-full w-full flex-col gap-2">
			<NTModalHeader>소개글</NTModalHeader>

			<NTModalContent className="flex h-fit flex-col gap-[28px]">
				<NTSearchfield />
				<TextArea tags={["#네일맛집", "#주차가능"]} />
			</NTModalContent>

			<NTModalFooter className="h-fit">
				<NTButton onClick={onClickSavingButton}>저장하기</NTButton>
			</NTModalFooter>
		</div>
	)
}

type TextAreaPT = {
	tags?: string[]
}

function TextArea({ tags = [] }: TextAreaPT) {
	return (
		<div className="relative flex h-[200px] w-full flex-col gap-[10px] rounded-[22px] border-[1.6px] border-Gray30 bg-White p-[20px] pt-[10px] outline-none">
			<div className="flex h-fit w-full flex-wrap gap-[5px] text-nowrap">
				{tags.map((tag, idx) => (
					<p key={idx} className="text-Title02 text-Gray90">
						{tag}
					</p>
				))}
			</div>
			<textarea className="h-[70%] w-full resize-none text-Body01 text-Gray90 focus-visible:outline-none" />
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
