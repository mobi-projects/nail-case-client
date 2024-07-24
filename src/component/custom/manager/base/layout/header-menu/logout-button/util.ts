import { toast } from "sonner"

import { COMMON_HOME } from "@/constant/routing-path"
import { postLogout } from "@/util/api/auth-controller"
import { deleteAllCookies } from "@/util/common/auth"

export const handleLogout = async () => {
	const response = await postLogout()
	if (response?.status === 200) {
		deleteAllCookies()
		toast.success("안녕히 가세요")
		setTimeout(() => {
			window.location.href = COMMON_HOME
		}, 1000)
	} else {
		toast.warning("로그아웃에 실패했습니다.")
	}
}
