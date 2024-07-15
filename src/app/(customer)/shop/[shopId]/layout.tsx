import { ScrollProvider } from "@/component/custom/customer/shop/05/scroll-context"

export default function ShopLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ScrollProvider>
			<div className="flex w-full flex-col">{children}</div>
		</ScrollProvider>
	)
}
