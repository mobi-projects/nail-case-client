import { axiosInstance } from "@/config/axios"

export const putUpdateAomImages = async (
	shopId: number,
	formData: FormData,
) => {
	const response = await axiosInstance("multipart/form-data").put(
		`/shops/${shopId}/monthly-art/images`,
		formData,
	)

	return response.data
}
