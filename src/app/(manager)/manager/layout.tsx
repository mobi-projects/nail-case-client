"use client"

export default function ManagerLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="max-w-dvw">{children}</div>
}
