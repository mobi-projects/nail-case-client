export default function Manager_Base_Home_03() {
	return (
		<div className="h-[430px] w-full">
			<div className="absolute left-0 flex h-fit w-full flex-col gap-[40px] overflow-x-hidden border-[5px] border-orange-300">
				<div className="ml-[calc(50%-600px)] h-fit w-full">
					<Manger_Base_Home_03_01 />
				</div>
				<Manger_Base_Home_03_02 />
			</div>
		</div>
	)
}
function Manger_Base_Home_03_01() {
	return <div className="h-[370px] w-full border-[5px] border-green-300" />
}
function Manger_Base_Home_03_02() {
	return <div className="h-[18px] w-full border-[5px] border-green-300" />
}
