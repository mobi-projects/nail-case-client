"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

import { REFRESH_TOKEN } from "@/constant/auth-key"

type AuthContextProps = {
	isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextProps>({ isAuthenticated: false })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const checkAuthStatus = () => {
			// `ACCESS_TOKEN` 쿠키의 존재 여부로 인증 상태를 확인합니다.
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith(`${REFRESH_TOKEN}=`))
			setIsAuthenticated(!!token)
		}

		checkAuthStatus() // 컴포넌트가 마운트될 때 `checkAuthStatus`를 호출합니다.
	}, []) // `document.cookie`를 사용하는데 `[]` 의존성 배열을 사용하여 처음 렌더링 시만 실행

	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
