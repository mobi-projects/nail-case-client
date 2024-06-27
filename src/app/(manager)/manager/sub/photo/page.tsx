import Manager_Sub_Photo_01 from "@/component/custom/manager/sub/photo/01"
import Manager_Sub_Photo_02 from "@/component/custom/manager/sub/photo/02"

export default function ManagerSubPhoto() {
	return (
		<div className="flex h-full w-full flex-col items-center gap-[52px]">
			<Manager_Sub_Photo_01 />
			<div className="flex h-fit w-[1033.37px] items-center justify-center">
				<Manager_Sub_Photo_02 />
			</div>
		</div>
	)
}
