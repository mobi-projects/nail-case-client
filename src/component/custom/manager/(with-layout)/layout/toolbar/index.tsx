"use client"
import { usePathname, useRouter } from "next/navigation"

import NTToolbar from "@/component/common/nt-toolbar"
import { LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR } from "@/constant/toolbar-list"

import { getFocusedIdx, getToolPathArr } from "./toolbar.util"

export default function ManagerToolbar({ shopId }: { shopId: string }) {
	const pathName = usePathname()
	const router = useRouter()
	const toolPathArr = getToolPathArr()
	const focusedIdx = getFocusedIdx(pathName, shopId)

	const onClickTool = (idx: number) => router.push(toolPathArr[idx])
	return (
		<div className="flex w-full flex-col">
			<hr className="absolute left-0 z-[-10] w-full border border-Gray10" />
			<NTToolbar
				toolList={[...LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR]}
				focusedIdx={focusedIdx}
				position="top"
				onClickTool={onClickTool}
			/>
		</div>
	)
}
