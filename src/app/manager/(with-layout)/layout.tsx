import ManagerBaseHeader from "@/component/custom/manager/(with-layout)/layout"

export default function ManagerBaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full pb-[42px]">
			<ManagerBaseHeader />
			{children}
		</div>
	)
}
