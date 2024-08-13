export const customPhoneNumber = (phoneNumber: string) => {
	if (phoneNumber.length === 10) {
		return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
	} else {
		return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
	}
}
