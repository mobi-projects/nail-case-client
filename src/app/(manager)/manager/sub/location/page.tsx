import Manager_Sub_Location_01 from "@/component/custom/manager/sub/location/01"
import { Manage_Sub_Location_02 } from "@/component/custom/manager/sub/location/02"

export default function Location() {
	return (
		<div className="flex flex-col gap-[20px] py-[20px]">
			<Manager_Sub_Location_01 />
			<Divider />
			<div className="h-fit w-full">
				<p className="w-full text-Body01 text-Gray90">주소지</p>
			</div>
			<Manage_Sub_Location_02 />
		</div>
	)
}

function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
