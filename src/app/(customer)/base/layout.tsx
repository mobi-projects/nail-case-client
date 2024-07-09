import NTToast from "@/component/common/nt-toast"
import CustomerBaseHeader from "@/component/custom/customer/base/layout"

export default function CustomerBaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full pb-[40px]">
			<CustomerBaseHeader />
			<NTToast />
			{children}
		</div>
	)
}
