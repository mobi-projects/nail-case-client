import InstructionList from "./instruction-list"

export default function ShopRegisterHeader() {
	return (
		<header className="flex h-[10rem] min-h-fit w-full flex-col justify-center gap-[12px] border-b border-Gray20 py-2">
			<h1 className="text-Title01 font-Bold text-Black">매장 등록하기</h1>
			<InstructionList />
		</header>
	)
}
