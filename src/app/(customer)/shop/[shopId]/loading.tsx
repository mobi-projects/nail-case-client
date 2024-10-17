import NTLoadingSpinner from "@/component/common/nt-loading-spinner"

export default function ShopDetailLoading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col">
				<NTLoadingSpinner size="large" />
				<p className="font-medium text-lg">Loading...</p>
			</div>
		</div>
	)
}
