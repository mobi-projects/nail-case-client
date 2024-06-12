// src/component/common/Logo.tsx
import Image from "next/image"
import React from "react"

import logoSrc from "../../../../public/asset/nt-logo.svg"

export default function NTLogo() {
	return <Image src={logoSrc} alt="Logo" />
}
