import { Manager_Sub_Layout_01 } from "@/component/custom/manager/sub/layout/01"

export default function ManagerLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex h-full w-full flex-col">
			<Manager_Sub_Layout_01 />
			{children}
		</div>
	)
}
