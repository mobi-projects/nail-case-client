import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { ACCESS_TOKEN, IS_MANAGER } from "./constant/auth-key"

export function middleware(request: NextRequest) {
	const token = request.cookies.get(ACCESS_TOKEN)
	const isManager = request.cookies.get(IS_MANAGER)?.value === "true"
	const isAuth = !!token

	// 요청 URL을 확인합니다.
	const url = request.nextUrl.clone()
	const pathname = url.pathname

	// '/sign/oauth2/callback/kakao'와 '/sign' 경로는 미들웨어를 건너뜁니다.
	if (
		pathname.startsWith("/sign/oauth2/callback/kakao") ||
		pathname.startsWith("/sign")
	) {
		return NextResponse.next()
	}

	// 사용자가 로그인이 되어 있지만 manager 페이지 접근을 차단
	if (isAuth && !isManager && pathname.startsWith("/manager")) {
		console.log("Redirecting to home from manager page")
		return NextResponse.redirect(new URL("/", request.url))
	}
	// 비로그인 상태에서의 /manager 경로 접근 차단
	if (!isAuth && pathname.startsWith("/manager")) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	// 비로그인 상태에서 shopId/숫자 경로는 접근 허용, 그 이후의 서브 경로는 차단
	if (!isAuth && pathname.match(/^\/shop\/\d+\/(?!$)/)) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	// 로그인 상태에서 모든 페이지 접근 허용
	return NextResponse.next()
}

// 모든 경로에 적용합니다.
export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
