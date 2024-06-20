import Manager_Base_Layout_01 from "@/component/custom/manager/base/layout/01"

export default function ManagerBaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full pb-[42px]">
			<Manager_Base_Layout_01 />
			{children}
		</div>
	)
}
