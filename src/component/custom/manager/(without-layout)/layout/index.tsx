export function Manager_Sub_Layout_01() {
	return (
		<div className="flex h-fit w-full">
			<div className="h-[131px] w-full" />
			<div className="absolute left-0 top-0 h-[131px] w-full border-[5px] border-red-500" />
			<AbsoluteDivider />
		</div>
	)
}
function AbsoluteDivider() {
	return (
		<div className="absolute left-0 top-[131px] h-[1px] w-full bg-Gray20" />
	)
}
