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
					onClick={() =>
						router.push("https://nail-case-client.vercel.app/manager")
					}
				>
					관리자 페이지
				</NTButton>
				<NTButton
					variant={"primary"}
					size={"medium"}
					onClick={() =>
						router.push("https://nail-case-client.vercel.app/home")
					}
				>
					사용자 페이지
				</NTButton>
			</div>
		</main>
	)
}
