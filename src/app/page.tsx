"use client"
import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"

export default function Home() {
	const router = useRouter()
	return (
		<main>
			<h1>1차 데모데이!</h1>
			<div className="">
				<NTButton
					variant={"primary"}
					size={"medium"}
					onClick={() => router.push("http://localhost:3000/manager")}
				>
					관리자 페이지
				</NTButton>
				<NTButton
					variant={"primary"}
					size={"medium"}
					onClick={() => router.push("http://localhost:3000/home")}
				>
					사용자 페이지
				</NTButton>
			</div>
		</main>
	)
}
