import { Toaster } from "sonner"

export default function NTToast() {
	return (
		<Toaster
			toastOptions={{
				style: {
					width: "22rem",
					right: "0",
					bottom: "1rem",
				},
			}}
		/>
	)
}
