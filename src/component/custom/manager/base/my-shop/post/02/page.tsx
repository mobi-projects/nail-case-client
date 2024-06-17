export default function Manager_Base_MyShop_Post_02() {
	return (
		<div className="grid w-full grid-cols-3 gap-[25px] border-[5px] border-orange-300">
			{Array.from({ length: 6 }, (_, idx) => (
				<Manager_Base_MyShop_Post_02_01 key={idx} />
			))}
		</div>
	)
}
function Manager_Base_MyShop_Post_02_01() {
	return (
		<div className="aspect-square w-[384px] border-[5px] border-green-300" />
	)
}
