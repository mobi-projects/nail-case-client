import NTIcon from "@/component/common/nt-icon"

export function AOMAddBox() {
	return (
		<div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-Gray30 bg-White hover:scale-105 hover:bg-Gray10">
			<NTIcon icon="camera" className="h-6 w-6 text-Gray40" />
			<p className="text-Body02 text-Gray50">
				<span className="text-PB80">9</span>/10
			</p>
		</div>
	)
}
