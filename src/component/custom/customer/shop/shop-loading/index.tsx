export default function ShopLoading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex items-center space-x-2">
				<div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-PB100 border-t-transparent"></div>
				<p className="font-medium text-lg">Loading...</p>
			</div>
		</div>
	)
}
