import { NTPulldownProvider } from "@/component/common/atom/nt-pulldown"
import NTToast from "@/component/common/nt-toast"
import ManagerBaseHeader from "@/component/custom/manager/base/layout/01"

export default function ManagerBaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full pb-[42px]">
			<NTPulldownProvider>
				<ManagerBaseHeader />
				<NTToast />
			</NTPulldownProvider>
			{children}
		</div>
	)
}
