import NTLoadingSpinner from "@/component/common/nt-loading-spinner"

export default function ShopLoading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex items-center space-x-2">
				<NTLoadingSpinner size="small" />
				<p className="font-medium text-lg">Loading...</p>
			</div>
		</div>
	)
}
