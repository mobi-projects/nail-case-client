import { Toaster } from "sonner"

export default function NTToast() {
	return (
		<Toaster
			toastOptions={{
				style: {
					width: "485px",
					right: "20px",
					bottom: "20px",
				},
			}}
		/>
	)
}
