import Link from "next/link"

import { NTButton } from "@/component/common/atom/nt-button"

export default function UserHome() {
	return (
		<div className="h-[40rem] w-[20rem] bg-green-200">
			<h1>shop-detail 확인하러가기!</h1>
			<Link href={"/home/123123"}>
				<NTButton>mobi shop detail</NTButton>
			</Link>
		</div>
	)
}
